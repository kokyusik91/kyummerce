import { products } from '@prisma/client'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

const TAKE = 9

export default function ProdcutsPage() {
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<products[]>([])

  useEffect(() => {
    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])

  const getProdcuts = useCallback(() => {
    const next = skip + TAKE
    fetch(`/api/get-products?skip=${next}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => {
        const list = products.concat(data.items)
        setProducts(list)
      })

    setSkip(next)
  }, [skip, products])
  return (
    <div className="mt-36 mb-36">
      <div className="grid grid-cols-3 gap-5">
        {products &&
          products.map((item) => (
            <div key={item.id}>
              <Image
                className="rounded"
                src={item.image_url ?? ''}
                width={300}
                height={200}
                alt={item.name}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFRGpBwABQQC+j7VjogAAAABJRU5ErkJggg=="
              />
              <div className="flex">
                <span>{item.name}</span>
                <span className="ml-auto">{item.price.toLocaleString('ko-KR')}원</span>
              </div>
              <span className="text-zinc-400">{item.category_id === 1 && '의류'}</span>
            </div>
          ))}
      </div>
      <button onClick={getProdcuts} className="w-full rounded mt-20 bg-zinc-200 p-4">
        더보기
      </button>
    </div>
  )
}
