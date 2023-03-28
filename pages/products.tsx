import { useState } from 'react'
import Carousel from 'nuka-carousel'
import Image from 'next/legacy/image'
import Head from 'next/head'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1010/1000/600/',
    thumbnail: 'https://picsum.photos/id/1010/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1013/1000/600/',
    thumbnail: 'https://picsum.photos/id/1013/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1012/1000/600/',
    thumbnail: 'https://picsum.photos/id/1012/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1011/1000/600/',
    thumbnail: 'https://picsum.photos/id/1011/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1014/1000/600/',
    thumbnail: 'https://picsum.photos/id/1014/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1020/1000/600/',
    thumbnail: 'https://picsum.photos/id/1020/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1024/1000/600/',
    thumbnail: 'https://picsum.photos/id/1024/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1027/1000/600/',
    thumbnail: 'https://picsum.photos/id/1027/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1028/1000/600/',
    thumbnail: 'https://picsum.photos/id/1028/250/150/',
  },
]

function Proucts() {
  const [index, setIndex] = useState(0)

  return (
    <>
      <Head>
        <meta property="og:url" content="https://dgdr.io/"></meta>
        <meta property="og:title" content="동거동락 - 부동산 임대관리 자동화"></meta>
        <meta property="og:description" content="세입자 월세 수납, 청구 안내 등 자동으로 편하게!"></meta>
        <meta property="og:image" content="/assets/images/kakaoThumbnail.png"></meta>
        <Carousel animation="fade" autoplay withoutControls={true} wrapAround speed={10} slideIndex={index}>
          {images.map((item) => (
            <Image key={item.original} src={item.original} alt="image" width={1000} height={600} layout="responsive" />
          ))}
        </Carousel>
        <div style={{ display: 'flex' }}>
          {images.map((item, idx) => (
            <div key={idx} onClick={() => setIndex(idx)}>
              <Image src={item.original} alt="image" width={100} height={60} />
            </div>
          ))}
        </div>
      </Head>
    </>
  )
}

export default Proucts
