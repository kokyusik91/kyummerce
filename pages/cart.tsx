import React, { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { CountControl } from 'components/CountControl'
import { IconRefresh, IconX } from '@tabler/icons-react'
import styled from '@emotion/styled'
import { Button } from '@mantine/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categories, products, Cart } from '@prisma/client'
import { Router, useRouter } from 'next/router'
import { CATEGORY_MAP } from 'constants/products'

//  기존 DB 스키마에 extends로 타입 추가
interface CartItem extends Cart {
  name: string
  price: number
  image_url: string
}

const Row = styled.div`
  display: flex;
  * ~ * {
    margin-left: auto;
  }
`

export const CART_QUERY_KEY = '/api/get-cart'

// const mockData = [
//   {
//     name: '멋드러진 신발',
//     productId: 120,
//     price: 20000,
//     quantity: 1,
//     amount: 20000,
//     image_url: 'https://devjeans-photo.s3.amazonaws.com/2023-04-04T14:29:11.790883bunny.jpg',
//   },
//   {
//     name: '멋드러진 후드',
//     productId: 119,
//     price: 15000,
//     quantity: 1,
//     amount: 15000,
//     image_url: 'https://devjeans-photo.s3.amazonaws.com/2023-04-04T14:29:11.790883bunny.jpg',
//   },
// ]

function CartPage() {
  const router = useRouter()

  const { data } = useQuery<{ items: CartItem[] }, unknown, CartItem[]>([CART_QUERY_KEY], () =>
    fetch(CART_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items),
  )

  console.log(data)

  const deliveryAmount = data && data.length > 0 ? 5000 : 0
  const discountAmount = 0

  const amount = useMemo(() => {
    if (data == null) {
      return 0
    }
    return data.map((item) => item.amount).reduce((prev, cul) => prev + cul, 0)
  }, [data])

  //  추천 상품 조회
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
      <span className="text-2xl mb-3">cart {data ? data.length : 0}</span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {data ? (
            data?.length > 0 ? (
              data?.map((item, idx) => <Item key={item.id} {...item} />)
            ) : (
              <div>장바구니에 아무것도 없습니다.</div>
            )
          ) : (
            <div>불러오는 중.....</div>
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
  const queryClient = useQueryClient()

  useEffect(() => {
    if (quantity != null) setAmount(quantity * props.price)
  }, [quantity, props.price])

  const { mutate: updateCart } = useMutation<unknown, unknown, Cart, any>(
    (item) =>
      fetch(`/api/update-cart`, {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      onMutate: async (item) => {
        await queryClient.cancelQueries([CART_QUERY_KEY])

        const previous = queryClient.getQueryData([CART_QUERY_KEY])

        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== item.id).concat(item),
        )

        return { previous }
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context.previous)
      },
    },
  )

  const { mutate: deleteCart } = useMutation<unknown, unknown, number, any>(
    (id) =>
      fetch(`/api/delete-cart`, {
        method: 'POST',
        body: JSON.stringify({ id }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries([CART_QUERY_KEY])

        const previous = queryClient.getQueryData([CART_QUERY_KEY])

        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) => old?.filter((c) => c.id !== id))

        return { previous }
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context.previous)
      },
    },
  )

  const handleUpdate = () => {
    // TODO : 장바구니에서 삭제 기능 구현
    if (quantity == null) {
      alert('최소 수량을 입력해주세요!')
      return
    }
    updateCart({ ...props, quantity: quantity, amount: props.price * quantity })
  }

  const handleDelete = async () => {
    // TODO : 장바구니에서 삭제 기능 구현
    await deleteCart(props.id)
    alert('장바구니 삭제하기!')
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

export default CartPage
