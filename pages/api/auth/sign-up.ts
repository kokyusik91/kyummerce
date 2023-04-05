import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import jwtDecode from 'jwt-decode'

const prisma = new PrismaClient()
// 카테고리
async function signup(credential: string) {
  const decode: { name: string; email: string; picture: string } = jwtDecode(credential)
  try {
    const response = await prisma.user.upsert({
      where: {
        email: decode.email,
      },
      update: {
        name: decode.name,
        image: decode.picture,
      },
      create: {
        email: decode.email,
        name: decode.name,
        image: decode.picture,
      },
    })
    console.log('response', response)
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
  const { credential } = req.query
  try {
    const products = await signup(String(credential))
    res.status(200).json({ items: products, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
