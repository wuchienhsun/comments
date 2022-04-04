// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  userName: string
  avatar: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  if (req.method === 'GET') {
    const user = await axios.get(
      'https://random-data-api.com/api/users/random_user'
    )
    res
      .status(200)
      .json({ userName: user.data.first_name, avatar: user.data.avatar })
    return
  }
  res.status(404).send('Not Found')
}
