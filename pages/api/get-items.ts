import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const amazingConsole = (argument: any) => {
  return console.log('🔫🔫', argument, '🔫🔫')
}

const notion = new Client({
  auth: `secret_Oj6hlE3jONakK3iJCyYNdl4HLKoxNRENdcpCyL9L1ay`,
})

const databaseId = '0cb56b1d31c14778a2f3ea197e96029c'

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    })
    amazingConsole(response)
    return response
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const response = await getItems()
    res.status(200).json({ items: response?.results, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
