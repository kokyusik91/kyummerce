import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const amazingConsole = (argument: any) => {
  return console.log('🔫🔫', argument, '🔫🔫')
}

const notion = new Client({
  auth: `secret_Oj6hlE3jONakK3iJCyYNdl4HLKoxNRENdcpCyL9L1ay`,
})

const databaseId = '0cb56b1d31c14778a2f3ea197e96029c'

async function getDetail(pageId: string, propertyId: string) {
  try {
    const response = notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    })
    amazingConsole(response)
    return response
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  detail?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const { pageId, propertyId } = req.query
    const response = await getDetail(String(pageId), String(propertyId))
    res.status(200).json({ detail: response, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
