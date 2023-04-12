import React, { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { CountControl } from 'components/CountControl'
import { IconRefresh, IconX } from '@tabler/icons-react'
import styled from '@emotion/styled'
import { Button } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { categories, products } from '@prisma/client'
import { Router, useRouter } from 'next/router'
import { CATEGORY_MAP } from 'constants/products'

interface CartItem {
  name: string
  productId: number
  price: number
  quantity: number
  amount: number
  image_url: string
}

const Row = styled.div`
  display: flex;
  * ~ * {
    margin-left: auto;
  }
`

const mockData = [
  {
    name: '멋드러진 신발',
    productId: 120,
    price: 20000,
    quantity: 1,
    amount: 20000,
    image_url: 'https://devjeans-photo.s3.amazonaws.com/2023-04-04T14:29:11.790883bunny.jpg',
  },
  {
    name: '멋드러진 후드',
    productId: 119,
    price: 15000,
    quantity: 1,
    amount: 15000,
    image_url: 'https://devjeans-photo.s3.amazonaws.com/2023-04-04T14:29:11.790883bunny.jpg',
  },
]

function Cart() {
  const [data, setCartData] = useState<CartItem[]>([])
  const router = useRouter()
  const amount = useMemo(() => {
    return data.map((item) => item.amount).reduce((prev, cul) => prev + cul, 0)
  }, [data])

  const deliveryAmount = 5000
  const discountAmount = 0

  useEffect(() => {
    const mockData = [
      {
        name: '멋드러진 신발',
        productId: 120,
        price: 20000,
        quantity: 1,
        amount: 20000,
        image_url: 'https://devjeans-photo.s3.amazonaws.com/2023-04-04T14:29:11.790883bunny.jpg',
      },
      {
        name: '멋드러진 후드',
        productId: 119,
        price: 15000,
        quantity: 1,
        amount: 15000,
        image_url: 'https://devjeans-photo.s3.amazonaws.com/2023-04-04T14:29:11.790883bunny.jpg',
      },
    ]
    setCartData(mockData)
  }, [mockData])

  const { data: products } = useQuery<{ items: products[] }, unknown, products[]>(
    [`/api/get-products?skip=0&take=3`],
    () => fetch(`/api/get-products?skip=0&take=3`).then((res) => res.json()),
    {
      select: (data) => data.items,
    },
  )

  const handleOrder = () => {
    alert('장바구니에 담긴 내용들 주문하기')
  }

  return (
    <div>
      <span className="text-2xl mb-3">cart {data.length}</span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {data?.length > 0 ? (
            data.map((item, idx) => <Item key={idx} {...item} />)
          ) : (
            <div>장바구니에 아무것도 없습니다.</div>
          )}
        </div>
        <div className="px-4">
          <div
            className="flex flex-col p-4 space-y-4"
            style={{ minWidth: 300, border: '1px solid grey' }}
          >
            <div>Info</div>
            <Row>
              <span>금액</span>
              <span>{amount.toLocaleString('ko-KR')} 원</span>
            </Row>
            <Row>
              <span>배송비</span>
              <span>{deliveryAmount.toLocaleString('ko-KR')}원</span>
            </Row>
            <Row>
              <span>할인 금액</span>
              <span>{discountAmount.toLocaleString('ko-KR')}원</span>
            </Row>
            <Row>
              <span className="font-semibold">결제 금액</span>
              <span className="font-semibold text-red-400">
                {(amount + deliveryAmount - discountAmount).toLocaleString('ko-KR')}원
              </span>
            </Row>
            <Button
              style={{ backgroundColor: '#2f3e39' }}
              radius="xl"
              size="md"
              styles={{
                root: { paddingRight: 14, height: 48 },
              }}
              onClick={handleOrder}
            >
              구매하기
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <p>추천 상품</p>
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
      </div>
    </div>
  )
}

const Item = (props: CartItem) => {
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity)
  const [amount, setAmount] = useState<number>(props.quantity)
  const router = useRouter()
  useEffect(() => {
    if (quantity != null) setAmount(quantity * props.price)
  }, [quantity, props.price])

  const handleUpdate = () => {
    // TODO : 장바구니에서 삭제 기능 구현
    alert('장바구니에서 ${props.name} 업데이트')
  }

  const handleDelete = () => {
    // TODO : 장바구니에서 삭제 기능 구현
    alert('장바구니에서 ${props.name} 삭제')
  }

  return (
    <div>
      <div className="w-full flex p-4" style={{ borderBottom: '1px solid grey' }}>
        <Image
          src={props.image_url}
          width={155}
          height={155}
          alt={props.name}
          onClick={() => router.push(`/products/${props.productId}`)}
        />
        <div className="flex flex-col ml-4">
          <span className="font-semibold mb-2">{props.name}</span>
          <span className="mb-auto">가격 : {props.price.toLocaleString('ko-KR')}</span>
          <div className="flex items-center space-x-4">
            <CountControl value={quantity} setValue={setQuantity} max={20} />
            <IconRefresh onClick={handleUpdate} />
          </div>
        </div>
        <div className="flex ml-auto space-x-4">
          <span>{amount.toLocaleString('ko-KR')}원</span>
          <IconX onClick={handleDelete} />
        </div>
      </div>
    </div>
  )
}

export default Cart
