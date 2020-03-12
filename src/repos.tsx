import React from 'react'
import { graphql, QueryRenderer } from 'react-relay'

import environment from './relay'

import { reposReposListQuery } from './__generated__/reposReposListQuery.graphql'

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
                  name
                  url
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
          <div>
            {props.viewer.repositories.edges?.map(repo => (
              <div>{repo?.node?.name}</div>
            ))}
          </div>
        )
      }}
    />
  )
}
