import React, { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import produce from 'immer'

import * as RepositoriesTypes from './__generated__/repositories'

import { reposQuery } from './lib'

export const Repositories = () => {
  const { loading, error, data, fetchMore } = useQuery<
    RepositoriesTypes.repositories,
    RepositoriesTypes.repositoriesVariables
  >(reposQuery, {
    variables: {
      after: null
    }
  })

  const loadMore = useCallback(() => {
    fetchMore({
      variables: {
        after: data!.viewer.repositories.pageInfo.endCursor
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
  }, [data, fetchMore])

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
        <button onClick={loadMore}>load more</button>
      )}
    </div>
  )
}
