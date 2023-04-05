import { categories, products } from '@prisma/client'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { Input, Pagination, SegmentedControl, Select } from '@mantine/core'
import { CATEGORY_MAP, FILTERs } from 'constants/products'
import { IconSearch } from '@tabler/icons-react'
import useDebounce from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const TAKE = 9

export default function ProdcutsPage() {
  const router = useRouter()
  const [activePage, setPage] = useState(1)
  const { data: session } = useSession()
  // const [total, setTotal] = useState(0)
  // const [categories, setCategories] = useState<categories[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('-1')
  // const [products, setProducts] = useState<products[]>([])
  const [selectefilter, setFilter] = useState<string | null>(FILTERs[0].value)
  const [keyWord, setKeyWorkd] = useState('')

  // keyword가 들어오면 600ms동안 안바뀐값이 들어오낟.
  const debouncedKeyword = useDebounce<string>(keyWord)

  // 마운트 되는 시점에 한번만 호출
  // useEffect(() => {
  // fetch(`/api/get-categories`).then((res) => res.json())
  //     .then((data) => setCategories(data.items))
  // }, [])

  // useQuery<최초에 받은 데이터, 에러, 출력하는 데이터>
  const { data: categories } = useQuery<{ items: categories[] }, unknown, categories[]>(
    [`/api/get-categories`],
    () => fetch(`/api/get-categories`).then((res) => res.json()),
    { select: (data) => data.items },
  )

  // useEffect(() => {
  //   fetch(`/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`)
  //     .then((res) => res.json())
  //     .then((data) => setTotal(Math.ceil(data.items / TAKE)))
  // }, [selectedCategory, debouncedKeyword])

  const { data: total } = useQuery(
    [`/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`],
    () =>
      fetch(`/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`)
        .then((res) => res.json())
        .then((data) => Math.ceil(data.items / TAKE)),
  )

  // useEffect(() => {
  //   const skip = TAKE * (activePage - 1)
  //   fetch(
  //     `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectefilter}&contains=${debouncedKeyword}`,
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items))
  // }, [activePage, selectedCategory, selectefilter, debouncedKeyword])

  const { data: products } = useQuery<{ items: products[] }, unknown, products[]>(
    [
      `/api/get-products?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectefilter}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectefilter}&contains=${debouncedKeyword}`,
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWorkd(e.target.value)
  }

  return (
    <div className="px-36 mt-36 mb-36">
      {session && <p>안녕하세요 . {session.user?.name}님</p>}
      <div className="mb-4">
        <Input
          icon={<IconSearch />}
          placeholder="Your email"
          value={keyWord}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Select value={selectefilter} onChange={setFilter} data={FILTERs} />
      </div>
      {categories && (
        <div className="mb-4">
          <SegmentedControl
            value={selectedCategory}
            onChange={setSelectedCategory}
            data={[
              { label: 'ALL', value: '-1' },
              ...categories.map((item) => ({ label: item.name, value: String(item.id) })),
            ]}
            color="dark"
          />
        </div>
      )}
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => (
            <div
              key={item.id}
              style={{ maxWidth: 300 }}
              onClick={() => router.push(`/products/${item.id}`)}
            >
              <Image
                className="rounded"
                src={item.image_url ?? ''}
                width={310}
                height={390}
                alt={item.name}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
              />
              <div className="flex">
                <span>{item.name}</span>
                <span className="ml-auto">{item.price.toLocaleString('ko-KR')}원</span>
              </div>
              <span className="text-zinc-400">
                {CATEGORY_MAP[item.category_id ? item.category_id - 1 : 0]}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex mt-5">
        {total && <Pagination className="m-auto" onChange={setPage} total={total} />}
      </div>
    </div>
  )
}
