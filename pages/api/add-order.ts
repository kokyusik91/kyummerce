import type { NextApiRequest, NextApiResponse } from 'next'
import { Cart, OrderItem, PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

// cart는 db에서 업데이트하면서 새로 생성된다. Omit 키워드는 은 기존 Cart에서 id, userId를 빼준다.
async function addOrder(
  userId: string,
  items: Omit<OrderItem, 'id'>[],
  orderInfo?: { receiver: string; address: string; phoneNumber: string },
) {
  try {
    // orderItem 들을 만든다.

    let orderItemIds = []
    for (const item of items) {
      const orderItem = await prisma.orderItem.create({
        data: {
          ...item,
        },
      })
      console.log(`Created Id : ${orderItem.id}`)
      orderItemIds.push(orderItem.id)
    }

    console.log(JSON.stringify(orderItemIds))

    const orderItem = await prisma.orders.create({
      data: {
        userId,
        orderItemIds: orderItemIds.join(','),
        ...orderInfo,
        status: 0,
      },
    })

    console.log(orderItem)
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await getServerSession(req, res, authOptions)
  // item은 클라이언트에서 받아온 장바구니 정보 객체
  const { items, orderInfo } = JSON.parse(req.body)
  if (session == null) {
    res.status(200).json({ items: [], message: `no session` })
    return
  }
  try {
    const wishlist = await addOrder(String(session.id), items, orderInfo)
    res.status(200).json({ items: wishlist, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
