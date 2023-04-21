import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function getComment(userId: string, orderItemId: number) {
  try {
    const response = await prisma.comment.findUnique({
      where: {
        orderItemId: orderItemId,
      },
    })

    if (response?.userId === userId) {
      return response
    }

    return { message: 'userId is not matched' }
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { orderItemId } = req.query
  // next_auth에서 session을 가지고옴
  const session = await getServerSession(req, res, authOptions)
  // session이 없을때
  if (session == null) {
    res.status(200).json({ items: [], message: `no session` })
    return
  }

  if (orderItemId == null) {
    res.status(200).json({ items: [], message: `no orderItem` })
    return
  }
  try {
    const wishlist = await getComment(String(session.id), Number(orderItemId))
    res.status(200).json({ items: wishlist, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
