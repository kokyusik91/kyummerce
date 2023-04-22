import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function updateComment({
  userId,
  orderItemId,
  rate,
  contents,
}: {
  userId: string
  orderItemId: number
  rate: number
  contents: string
}) {
  try {
    const response = await prisma.comment.upsert({
      where: {
        orderItemId,
      },
      update: {
        contents,
        rate,
      },
      // 없을때는 새로 userId까지 추가해야함.
      create: {
        userId,
        orderItemId,
        contents,
        rate,
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
  if (session == null) {
    res.status(200).json({ items: [], message: `no session` })
    return
  }
  try {
    const { orderItemId, rate, contents } = JSON.parse(req.body)
    const wishlist = await updateComment({
      userId: String(session.id),
      orderItemId: Number(orderItemId),
      rate: rate,
      contents: contents,
    })
    res.status(200).json({ items: wishlist, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
