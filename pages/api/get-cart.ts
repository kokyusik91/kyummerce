import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function getCart(userId: string) {
  try {
    // 한사람에게도 여러개의 cart가 들어갈 수 있기 때문
    const cart =
      await prisma.$queryRaw`SELECT c.id, userId, price, quantity, amount, image_url, name, productId FROM Cart as c JOIN products as p WHERE c.productId=p.id AND c.userId=${userId};`

    // cart 목록을 불러왔다 하지만 거기서 product도 같이 불러오고 싶다 => JOIN 사용

    console.log('찜한 목록들 💕', cart)
    return cart
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
    const wishlist = await getCart(String(session.id))
    res.status(200).json({ items: wishlist, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
