import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function getWishLists(userId: string) {
  try {
    // wishlist : '1,2,3'
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: userId,
      },
    })

    console.log

    // [1,2,3]
    const productsId = wishlist?.productIds.split(',').map((item) => Number(item))
    // productsId 배열이 있고, productsId 배열이 0 초과일때
    if (productsId && productsId.length > 0) {
      const response = await prisma.products.findMany({
        where: {
          id: {
            // 배열 전달할때 in을 쓴다.
            in: productsId,
          },
        },
      })
      console.log('찜한 목록들 💕', response)
      return response
    }

    return []
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
    const wishlist = await getWishLists(String(session.id))
    res.status(200).json({ items: wishlist, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
