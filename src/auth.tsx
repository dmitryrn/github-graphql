import React, { useEffect } from 'react'

import { useLocation, useHistory } from 'react-router'

import query from 'query-string'
import { setToken } from './store/auth'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'

export const Auth = () => {
  const { search } = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const [cookies, setCookies] = useCookies()

  useEffect(() => {
    const { code } = query.parse(search)

    // todo: code usage is incorrect

    if (typeof code === 'string') {
      const a = fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${}`)

      dispatch(setToken(code))
      setCookies('token', code)
      history.replace('/')
    } else {
      location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=http://localhost:9000/auth`
    }
  }, [])

  return <div>123</div>
}
