import { categories, products } from '@prisma/client'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Pagination, SegmentedControl } from '@mantine/core'
import { CATEGORY_MAP } from 'constants/products'

const TAKE = 9

export default function ProdcutsPage() {
  const [activePage, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState<categories[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('-1')
  const [products, setProducts] = useState<products[]>([])

  // 마운트 되는 시점에 한번만 호출
  useEffect(() => {
    fetch(`/api/get-categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.items))
  }, [])

  useEffect(() => {
    fetch(`/api/get-products-count?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setTotal(Math.ceil(data.items / TAKE)))
  }, [selectedCategory])

  useEffect(() => {
    const skip = TAKE * (activePage - 1)
    fetch(`/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [activePage, selectedCategory])

  return (
    <div className="px-36 mt-36 mb-36">
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
            <div key={item.id} style={{ maxWidth: 300 }}>
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
              <span className="text-zinc-400">{CATEGORY_MAP[item.category_id - 1]}</span>
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex mt-5">
        <Pagination className="m-auto" onChange={setPage} total={total} />;
      </div>
    </div>
  )
}
