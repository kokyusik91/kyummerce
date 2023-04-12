import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function updateWishList(userId: string, productId: string) {
  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: userId,
      },
    })

    const originWishList =
      wishlist?.productIds !== null && wishlist?.productIds !== ''
        ? wishlist?.productIds.split(',')
        : []

    const isWished = originWishList?.includes(productId)
    const newWishlist = isWished
      ? originWishList?.filter((id) => id !== productId)
      : [...(originWishList || []), productId]

    const response = await prisma.wishlist.upsert({
      where: {
        userId,
      },
      update: {
        productIds: newWishlist?.join(','),
      },
      create: {
        userId,
        productIds: newWishlist?.join(',') || '',
      },
    })

    console.log(response)
    return response?.productIds.split(',')
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
  const { productId } = JSON.parse(req.body)
  if (session == null) {
    res.status(200).json({ items: [], message: `no session` })
    return
  }
  try {
    const { productId } = JSON.parse(req.body)
    const wishlist = await updateWishList(String(session.id), String(productId))
    res.status(200).json({ items: wishlist, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
