import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const amazingConsole = (argument: any) => {
  return console.log('🔫🔫', argument, '🔫🔫')
}

const notion = new Client({
  auth: `secret_Oj6hlE3jONakK3iJCyYNdl4HLKoxNRENdcpCyL9L1ay`,
})

const databaseId = '0cb56b1d31c14778a2f3ea197e96029c'

async function addItem(text: string) {
  amazingConsole(text)
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: text,
            },
          },
        ],
      },
    })
    amazingConsole(response)
    console.log('Success! Entry added.')
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { name } = req.query

  if (name == '') {
    return res.status(400).json({ message: 'there is no name...' })
  }

  try {
    await addItem(String(name))
    res.status(200).json({ message: `Success ${name} added` })
  } catch (error) {
    res.status(400).json({ message: `Failed ${name} added` })
  }
}
