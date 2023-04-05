import { useEffect, useState } from 'react'
import Carousel from 'nuka-carousel'
import Image from 'next/legacy/image'
import Head from 'next/head'
import CustomEditor from 'components/Editor'
import { useRouter } from 'next/router'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { GetServerSidePropsContext } from 'next'
import { products } from '@prisma/client'
import { format } from 'date-fns'
import { CATEGORY_MAP } from 'constants/products'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const product = await fetch(`http://localhost:3000/api/get-product?id=${context.params?.id}`)
    .then((res) => res.json())
    .then((data) => data.items)
  return { props: { product: { ...product, images: [product.image_url, product.image_url] } } }
}

function Proucts(props: { product: products & { images: string[] } }) {
  const [index, setIndex] = useState(0)
  const router = useRouter()
  const { id: productId } = router.query
  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.product.contents)))
      : EditorState.createEmpty(),
  )

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

  const product = props.product

  return (
    <>
      {product != null && productId != null ? (
        <div className="p-24 flex flex-row">
          <div style={{ maxWidth: 600, marginRight: 52 }}>
            <Carousel
              animation="fade"
              autoplay
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
                  width={600}
                  height={600}
                  layout="responsive"
                />
              ))}
            </Carousel>
            <div className="flex space-x-4 mt-2">
              {product.images.map((url, idx) => (
                <div key={`${url}-thumbnail-${idx}`} onClick={() => setIndex(idx)}>
                  <Image src={url} alt="image" width={100} height={100} />
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
