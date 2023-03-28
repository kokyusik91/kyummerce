import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

// 임의의 데이터 배열
const productsData: Prisma.productsCreateInput[] = Array.apply(null, Array(100)).map(
  (_, index) => ({
    name: `Dark Jean ${index + 1}`,
    contents: `{"blocks":[{"key":"atblg","text":"This is fkin black Jean bro 😵 ${
      index + 1
    }","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"et2ll","text":"I do not want to by it!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/${
      (index + 1) % 10 === 0 ? 10 : (index + 1) % 10
    }.jpg`,
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  }),
)

// 1부터 10까지 주입

async function main() {
  // 기존에 있던 테이블을 다 지운다.
  await prisma.products.deleteMany({})

  for (let productItem of productsData) {
    const product = await prisma.products.create({
      data: productItem,
    })
    console.log(`Created id : ${product.id}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })

// product를 무한히 찍어낼 것이다.
