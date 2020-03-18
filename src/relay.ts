import {
  Environment,
  Network,
  RecordSource,
  Store,
  Variables,
  RequestParameters
} from 'relay-runtime'

import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const fetchQuery = (operation: RequestParameters, variables: Variables) => {
  const token = cookies.get('token')

  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json()
  })
}

export const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
})
