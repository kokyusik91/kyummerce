import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderItem, PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function getComments(productId: number) {
  console.log('프로덕트 아이디', productId)
  try {
    // orders 테이블에서 나의 주문들을 조회한다. (userId로 조회해서 다 가져온다.)
    const orderItems = await prisma.orderItem.findMany({
      where: {
        productId,
      },
    })

    let response = []

    // orderItemId를 기준으로 Comment를 조회한다.
    for (const orderItem of orderItems) {
      const res = await prisma.comment.findUnique({
        where: {
          orderItemId: orderItem.id,
        },
      })
      // 기존 [] 베열에다가 res 배열을 더한다.
      if (res) {
        response.push({ ...orderItem, ...res })
      }
    }

    console.log(response)

    return response
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // next_auth에서 session을 가지고옴
  // session이 없을때
  const { productId } = req.query
  if (productId == null) {
    res.status(200).json({ items: [], message: `no session` })
    return
  }
  try {
    const wishlist = await getComments(Number(productId))
    res.status(200).json({ items: wishlist, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
