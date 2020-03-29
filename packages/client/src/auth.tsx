import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router'
import query from 'query-string'
import { setToken } from './store'

const requestAccessToken = async (
  code: string
): Promise<{
  error?: 'bad_code' | 'no_code_returned' | { requestError: any }
  accessToken?: string
}> => {
  try {
    const res = await fetch('http://localhost:3000/api/access-code', {
      method: 'POST',
      body: JSON.stringify({
        code
      }),
      mode: 'cors',
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
      error: {
        requestError: error
      }
    }
  }
}

export const Auth = () => {
  const { search } = useLocation()
  const history = useHistory()

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
          setToken(accessToken)

          history.replace('/')
        }
      })
    } else {
      location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=http://localhost:9000/auth`
    }
  }, [search])

  return (
    <>
      {isError ? (
        <>
          <p>there was an error while trying to authenticate you with github</p>
          <button onClick={tryAgain}>try again</button>
        </>
      ) : (
        <p>authentication is in progress...</p>
      )}
    </>
  )
}
