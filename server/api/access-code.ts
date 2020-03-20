import { NowRequest, NowResponse } from '@now/node'
import axios from 'axios'
import query from 'query-string'

export default async (req: NowRequest, res: NowResponse) => {
    if (req.method !== 'POST') {
      res.status(405)
    res.end()
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
            res.status(400)
            res.end('bad_verification_code')
          }
        }

        res.end(
          JSON.stringify({
            accessToken: resData.access_token
          })
        )
    } catch (error) {
        res.status(500)
        res.end()
      }
    }

    res.status(400)
    res.end('code_param_not_provided')
  }
