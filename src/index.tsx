import React from 'react'
import ReactDOM from 'react-dom'
import {graphql, QueryRenderer} from 'react-relay'

import environment from './relay'

import { srcRepoQuery } from './__generated__/srcRepoQuery.graphql'

const App = () => {
  return  <QueryRenderer<srcRepoQuery>
    environment={environment}
    query={graphql`
      query srcRepoQuery {
        repository(name: "countries-graphql", owner: "dmitryrn") {
          name
          createdAt
          url
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (error) {
        return <div>Error!</div>
      }
      if (!props) {
        return <div>Loading...</div>
      }
      return <div>User ID: {props.repository?.url}</div>
    }}
  />
}

ReactDOM.render(<App />, document.querySelector('#root'))
