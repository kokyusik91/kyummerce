import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getOrderBy } from 'constants/products'

const prisma = new PrismaClient()

async function getProducts({
  skip,
  take,
  category,
  orderBy,
  contains,
}: {
  skip: number
  take: number
  category: number
  orderBy: string
  contains: string
}) {
  const containsCondition = contains && contains !== '' ? { name: { contains } } : undefined

  const whereCondition =
    category && category !== -1
      ? {
          category_id: category,
          ...containsCondition,
        }
      : containsCondition
      ? containsCondition
      : undefined
  const getOrderByValue = getOrderBy(orderBy)
  try {
    const response = await prisma.products.findMany({
      skip: skip,
      take: take,
      where: whereCondition,
      ...getOrderByValue,
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
  const { skip, take, category, orderBy, contains } = req.query

  if (skip == null || take == null) {
    res.status(400).json({ message: 'no skip or take 😭' })

    return
  }

  // skip or take에 글자가 들어 오면 에러 나오는 로직이 들어가야함.

  try {
    const products = await getProducts({
      skip: Number(skip),
      take: Number(take),
      category: Number(category),
      orderBy: String(orderBy),
      contains: String(contains),
    })
    res.status(200).json({ items: products, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
