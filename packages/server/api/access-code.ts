import { NowRequest, NowResponse } from '@now/node'
import axios from 'axios'
import query from 'query-string'

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const code = req.body?.code

  if (typeof code === 'string') {
    try {
      const ghRes = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code
        }
      )

      const resData = query.parse(ghRes.data)

      if (typeof resData === 'object') {
        if (resData.error === 'bad_verification_code') {
          res.status(400).end('bad_verification_code')
        }
      }

      res.json({
        accessToken: resData.access_token
      })
    } catch (error) {
      res.status(500).end()
    }
  }

  res.status(400).end('code_param_not_provided')
}
