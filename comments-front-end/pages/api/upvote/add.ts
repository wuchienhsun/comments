import { AxiosRequestConfig } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from '../../../lib/axios'

type Data = {
  status: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  if (req.method === 'POST') {
    const options: AxiosRequestConfig = {
      url: '/v1/comment/upvote',
      method: 'POST',
      data: req.body,
    }

    try {
      const result: Data = await request(options)
      res.status(200).json(result)
      return
    } catch (error) {
      console.log('upvote err', error)
      res.status(400).json({ status: 'error' })
      return
    }
  }
  res.status(404).send('Not Found')
}
