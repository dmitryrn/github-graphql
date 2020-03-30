import gql from 'graphql-tag'

export const reposQuery = gql`
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
