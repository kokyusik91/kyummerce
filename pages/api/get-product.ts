import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getProduct(id: number) {
  console.log('아이디', id)
  try {
    const response = await prisma.products.findUnique({
      where: {
        id: id,
      },
    })
    console.log('%%%%', response)
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
  try {
    const { id } = req.query
    if (id == null) {
      res.status(400).json({ message: `There is no ID to Access DB 😭` })
      return
    }
    const products = await getProduct(Number(id))
    res.status(200).json({ items: products, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
