import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import produce from 'immer'

import * as Repositories from './__generated__/repositories'

const query = gql`
  query repositories($after: String) {
    viewer {
      repositories(after: $after, first: 5) {
        nodes {
          id
          name
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

export const Repos = () => {
  const { loading, error, data, fetchMore } = useQuery<
    Repositories.repositories,
    Repositories.repositoriesVariables
  >(query, {
    variables: {
      after: null
    }
  })

  if (loading) {
    return <div>loading</div>
  }

  if (!loading && !data) {
    return <div>nothing was received from server</div>
  }

  if (error) {
    console.log(error)
    return <div>error. check console</div>
  }

  return (
    <div>
      <p>public repositories:</p>
      {data?.viewer.repositories.nodes?.map((repo) => (
        <div key={repo?.id}>{repo?.name}</div>
      ))}
      {data?.viewer.repositories.pageInfo.hasNextPage && (
        <button
          onClick={() => {
            fetchMore({
              variables: {
                after: data.viewer.repositories.pageInfo.endCursor
              },
              updateQuery: (prevRes, { fetchMoreResult }) =>
                fetchMoreResult
                  ? produce(fetchMoreResult, (draft) => {
                      draft.viewer.repositories.nodes = prevRes.viewer.repositories.nodes!.concat(
                        draft!.viewer.repositories.nodes
                      )
                    })
                  : prevRes
            })
          }}
        >
          load more
        </button>
      )}
    </div>
  )
}
