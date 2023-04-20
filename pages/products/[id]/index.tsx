import { useEffect, useState } from 'react'
import Carousel from 'nuka-carousel'
import Image from 'next/legacy/image'
import Head from 'next/head'
import CustomEditor from 'components/Editor'
import { useRouter } from 'next/router'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { GetServerSidePropsContext } from 'next'
import { Cart, OrderItem, products } from '@prisma/client'
import { format } from 'date-fns'
import { CATEGORY_MAP } from 'constants/products'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@mantine/core'
import { IconHeart, IconHeartbeat, IconShoppingCart } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { validateConfig } from 'next/dist/server/config-shared'
import { CountControl } from 'components/CountControl'
import { CART_QUERY_KEY } from 'pages/cart'
import { ORDER_QUERY_KEY } from 'pages/my'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const product = await fetch(`http://localhost:3000/api/get-product?id=${context.params?.id}`)
    .then((res) => res.json())
    .then((data) => data.items)
  return { props: { product: { ...product, images: [product.image_url, product.image_url] } } }
}

function Proucts(props: { product: products & { images: string[] } }) {
  const [index, setIndex] = useState(0)
  const { data: session } = useSession()
  const router = useRouter()
  const { id: productIt } = router.query
  const productId = String(productIt)
  const [quantity, setQuantity] = useState<number | undefined>(1)

  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.product.contents)))
      : EditorState.createEmpty(),
  )
  const queryClient = useQueryClient()

  //  기존 CSR
  // useEffect(() => {
  //   if (productId != null) {
  //     fetch(`/api/get-product?id=${productId}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.items.contents) {
  //           setEditorState(
  //             EditorState.createWithContent(convertFromRaw(JSON.parse(data.items.contents))),
  //           )
  //         } else {
  //           setEditorState(EditorState.createEmpty())
  //         }
  //       })
  //   }
  // }, [productId])

  const WISHLIST_QUERY_KEY = '/api/get-wishlist'

  // wishList
  const { data: wishList } = useQuery([WISHLIST_QUERY_KEY], () =>
    fetch(WISHLIST_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items),
  )

  const { mutate, isLoading } = useMutation<unknown, unknown, string, any>(
    (productId: string) =>
      fetch(`/api/update-wishlist`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      onMutate: async (productId) => {
        await queryClient.cancelQueries([WISHLIST_QUERY_KEY])

        const previous = queryClient.getQueryData([WISHLIST_QUERY_KEY])

        queryClient.setQueryData<string[]>([WISHLIST_QUERY_KEY], (old) =>
          old
            ? old.includes(String(productId))
              ? old.filter((id) => id !== String(productId))
              : old.concat(String(productId))
            : [],
        )

        return { previous }
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([WISHLIST_QUERY_KEY], context.previous)
      },
      // UX가 안좋다..
      // onSuccess: () => {
      //   queryClient.invalidateQueries([WISHLIST_QUERY_KEY])
      // },
    },
  )

  // 카트 추가 mutation

  const { mutate: addCart } = useMutation<unknown, unknown, Omit<Cart, 'id' | 'userId'>, any>(
    (item) =>
      fetch(`/api/add-cart`, {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      // mutate 했을때 초기화 시키고
      onMutate: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY])
      },
      // 성공했을때 페이지 이동을 실행!
      onSuccess: () => {
        router.push('/cart')
      },
    },
  )

  const { mutate: addOrder } = useMutation<unknown, unknown, Omit<OrderItem, 'id'>[], any>(
    (items) =>
      fetch(`/api/add-order`, {
        method: 'POST',
        body: JSON.stringify({ items }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      // mutate 했을때 초기화 시키고
      onMutate: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY])
      },
      // 성공했을때 페이지 이동을 실행!
      onSuccess: () => {
        router.push('/my')
      },
    },
  )

  const product = props.product

  const isWished = wishList != null && productId != null ? wishList.includes(productId) : false

  const validate = async (type: 'cart' | 'order') => {
    if (quantity === null) {
      alert('최소 수량을 선택하세요!!')
      return
    }
    alert('장바구니로 이동')

    // TODO : 장바구니에 등록 기능 추가
    if (type === 'cart') {
      addCart({
        productId: product.id,
        quantity: quantity || 1,
        amount: product.price * (quantity || 1),
      })
    }
    // 상세페이지에서는 order 하나만 주문 가능함.
    if (type === 'order') {
      addOrder([
        {
          productId: product.id,
          quantity: quantity || 1,
          price: product.price,
          amount: product.price * (quantity || 1),
        },
      ])
    }
  }

  return (
    <>
      {product != null && productId != null ? (
        <div className="flex flex-row">
          <div style={{ maxWidth: 600, marginRight: 52 }}>
            <Carousel
              animation="fade"
              // autoplay
              withoutControls={true}
              wrapAround
              speed={10}
              slideIndex={index}
            >
              {product.images.map((url, idx) => (
                <Image
                  key={`${url}-carousel-${idx}`}
                  src={url}
                  alt="image"
                  width={310}
                  height={390}
                  layout="responsive"
                />
              ))}
            </Carousel>
            <div className="flex space-x-4 mt-2">
              {product.images.map((url, idx) => (
                <div key={`${url}-thumbnail-${idx}`} onClick={() => setIndex(idx)}>
                  <Image src={url} alt="image" width={155} height={195} />
                </div>
              ))}
            </div>
            {editorState != null && <CustomEditor editorState={editorState} readOnly />}
          </div>
          <div style={{ maxWidth: 600 }} className="flex flex-col space-y-6">
            <div className="text-lg text-zinc-400">
              {CATEGORY_MAP[product.category_id ? product.category_id - 1 : 0]}
            </div>
            <div className="text-4xl font-semibold">{product.name}</div>
            <div className="text-lg">{product.price.toLocaleString('ko-KR')}원</div>
            <>{wishList}</>
            <div>
              <span className="text-lg">수량</span>
              <CountControl value={quantity} setValue={setQuantity} />
            </div>
            <div className="flex space-x-3">
              <Button
                leftIcon={<IconShoppingCart size={20} stroke={1.5} />}
                style={{ backgroundColor: '#2f3e39' }}
                radius="xl"
                size="md"
                styles={{
                  root: { paddingRight: 14, height: 48 },
                }}
                onClick={() => {
                  if (session == null) {
                    alert('로그인이 필요하요')
                    router.push('/auth/login')
                    return
                  }
                  validate('cart')
                }}
              >
                장바구니
              </Button>
              <Button
                // loading={isLoading}
                disabled={wishList == null}
                leftIcon={
                  isWished ? (
                    <IconHeartbeat size={20} stroke={1.5} />
                  ) : (
                    <IconHeart size={20} stroke={1.5} />
                  )
                }
                style={{ backgroundColor: isWished ? 'red' : 'grey' }}
                radius="xl"
                size="md"
                styles={{
                  root: { paddingRight: 14, height: 48 },
                }}
                onClick={() => {
                  if (session == null) {
                    alert('로그인이 필요하요')
                    router.push('/auth/login')
                    return
                  }
                  mutate(String(productId))
                }}
              >
                찜하기
              </Button>
            </div>
            <Button
              style={{ backgroundColor: '#2f3e39' }}
              radius="xl"
              size="md"
              styles={{
                root: { paddingRight: 14, height: 48 },
              }}
              onClick={() => {
                if (session == null) {
                  alert('로그인이 필요하요')
                  router.push('/auth/login')
                  return
                }
                validate('order')
              }}
            >
              구매하기
            </Button>
            <div className="text-sm text-zinc-300">
              둥록 : {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
            </div>
          </div>
        </div>
      ) : (
        <div>로딩중..</div>
      )}
    </>
  )
}

export default Proucts
