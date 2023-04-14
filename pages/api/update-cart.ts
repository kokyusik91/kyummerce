import type { NextApiRequest, NextApiResponse } from 'next'
import { Cart, PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

// cart는 db에서 업데이트하면서 새로 생성된다. Omit 키워드는 은 기존 Cart에서 id, userId를 빼준다.
async function updateCart(item: Cart) {
  try {
    const response = await prisma.cart.update({
      where: {
        id: item.id,
      },
      data: {
        quantity: item.quantity,
        amount: item.amount,
      },
    })

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
  const session = await getServerSession(req, res, authOptions)
  // item은 클라이언트에서 받아온 장바구니 정보 객체
  const { item } = JSON.parse(req.body)
  if (session == null) {
    res.status(200).json({ items: [], message: `no Session or Invalid Session` })
    return
  }
  try {
    const { productId } = JSON.parse(req.body)
    const wishlist = await updateCart(item)
    res.status(200).json({ items: wishlist, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
