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
  if (req.method === 'GET') {
    const options: AxiosRequestConfig = {
      url: '/v2/comments',
      method: 'GET',
    }
    const result: Data = await request(options)

    res.status(200).json(result)
    return
  }
  res.status(404).send('Not Found')
}