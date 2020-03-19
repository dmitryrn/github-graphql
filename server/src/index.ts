import path from 'path'
import assert from 'assert'

import dotenv from 'dotenv'

dotenv.config({
  path: path.resolve('..', '.env')
})

assert(process.env.GITHUB_CLIENT_ID?.length, 'GITHUB_CLIENT_ID not provided')
assert(
  process.env.GITHUB_CLIENT_SECRET?.length,
  'GITHUB_CLIENT_SECRET not provided'
)

import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import query from 'query-string'
import cors from 'cors' // todo: make cors work only for development mode

const jsonParser = bodyParser.json()

const app = express()

app.use(cors())

app
  .get('/', (req, res) => {
    res.end('todo: client here')
  })
  .post('/', jsonParser, async (req, res) => {
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
  })

app.listen(3000)
