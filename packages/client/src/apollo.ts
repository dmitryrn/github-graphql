import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

import { $token } from './store'

const cache = new InMemoryCache()

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${$token.getState()}`
        }
      })
      return forward(operation)
    }),
    new HttpLink({
      uri: 'https://api.github.com/graphql?fromApollo=1'
    })
  ]),
  cache
})
