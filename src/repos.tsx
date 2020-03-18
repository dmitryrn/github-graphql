import React from 'react'
import { graphql, QueryRenderer, createFragmentContainer } from 'react-relay'

import { environment } from './relay'

import { reposReposListQuery } from './__generated__/reposReposListQuery.graphql'
import { repos_repo } from './__generated__/repos_repo.graphql'

const RepoItem: React.FC<{
  repo: repos_repo
}> = ({ repo }) => {
  return (
    <li>
      {repo?.name} ({repo?.isPrivate ? 'private' : 'public'})
    </li>
  )
}

const RepoItemFragment = createFragmentContainer(RepoItem, {
  repo: graphql`
    fragment repos_repo on Repository {
      name
      isPrivate
      url
      primaryLanguage {
        name
      }
    }
  `
})

export const Repos = () => {
  return (
    <QueryRenderer<reposReposListQuery>
      environment={environment}
      query={graphql`
        query reposReposListQuery {
          viewer {
            repositories(first: 10) {
              edges {
                node {
                  id
                  ...repos_repo
                }
              }
              pageInfo {
                hasNextPage
              }
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>Error!</div>
        }
        if (!props) {
          return <div>Loading...</div>
        }
        return (
          <ul>
            {props.viewer.repositories.edges?.map(edge =>
              edge?.node ? (
                <RepoItemFragment key={edge?.node?.id} repo={edge?.node} />
              ) : (
                <li key={edge?.node?.id}>
                  repo with id ${edge?.node?.id} fetched incorrectly
                </li>
              )
            )}
          </ul>
        )
      }}
    />
  )
}
