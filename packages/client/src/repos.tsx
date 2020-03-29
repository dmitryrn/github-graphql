import React, { useEffect } from 'react'
import { gql, fromPromise } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import { me } from './__generated__/me'

const query = gql`
  query me {
    viewer {
      name
      bio
    }
  }
`

export const Repos = () => {
  const { loading, error, data } = useQuery<me>(query)

  return <div>{loading ? 'loa' : data?.viewer.name}</div>
}
