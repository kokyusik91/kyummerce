import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderItem, PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function getOrder(userId: string) {
  try {
    // orders 테이블에서 나의 주문들을 조회한다. (userId로 조회해서 다 가져온다.)
    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    })

    console.log('내 주문 정보', orders)

    let response = []
    // orders 안에 있는 orderItemIds로 orderItem을 꺼내고, products 테이블에서 제품 이미지, 이름 정보들을 조합한다.

    for (const order of orders) {
      let orderItems: OrderItem[] = []
      for (const id of order.orderItemIds.split(',').map((item) => Number(item))) {
        const res: OrderItem[] =
          await prisma.$queryRaw`SELECT i.id quantity, amount, i.price, name, image_url, productId FROM OrderItem as i JOIN products as p ON i.productId=p.id WHERE i.id=${id};`
        // 기존 [] 베열에다가 res 배열을 더한다.
        orderItems.push.apply(orderItems, res)
      }

      response.push({ ...order, orderItems })
    }

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
  const session = await getServerSession(req, res, authOptions)
  // session이 없을때
  if (session == null) {
    res.status(200).json({ items: [], message: `no session` })
    return
  }
  try {
    const wishlist = await getOrder(String(session.id))
    res.status(200).json({ items: wishlist, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
