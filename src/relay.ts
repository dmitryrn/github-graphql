import {
  Environment,
  Network,
  RecordSource,
  Store,
  Variables,
  RequestParameters,
} from 'relay-runtime'

function fetchQuery(
  operation: RequestParameters,
  variables: Variables,
) {
  return fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})

export default environment