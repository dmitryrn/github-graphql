import React, { useEffect, useState } from 'react'

import { useLocation, useHistory } from 'react-router'

import query from 'query-string'
import { setToken } from './store/auth'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'

const requestAccessToken = async (
  code: string
): Promise<{
  error?: 'bad_code' | 'no_code_returned'
  accessToken?: string
}> => {
  try {
    const res = await fetch('http://localhost:3000', {
      method: 'POST',
      body: JSON.stringify({
        code
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 400) {
      return {
        error: 'bad_code'
      }
    }

    const data = await res.json()

    if (typeof data?.accessToken === 'string') {
      return {
        accessToken: data.accessToken
      }
    }

    return {
      error: 'no_code_returned'
    }
  } catch (error) {
    return {
      error
    }
  }
}

export const Auth = () => {
  const { search } = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const [cookies, setCookies] = useCookies()

  const [isError, setIsError] = useState(false)

  const tryAgain = () => {
    history.replace('/auth')
    setIsError(false)
  }

  useEffect(() => {
    const { code } = query.parse(search)

    if (typeof code === 'string') {
      requestAccessToken(code).then(({ error, accessToken }) => {
        if (error /* any error */) {
          setIsError(true)
        }

        // check for both *not any* and *non zero length*
        if (accessToken?.length) {
          dispatch(setToken(accessToken))
          setCookies('token', accessToken)
          history.replace('/')
        }
      })
    } else {
      location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=http://localhost:9000/auth`
    }
  }, [location.search])

  return (
    <>
      {isError ? (
        <>
          <p>there was an error trying to authenticate you with github</p>
          <button onClick={tryAgain}>try again</button>
        </>
      ) : (
        <p>authentication is in progress...</p>
      )}
    </>
  )
}
