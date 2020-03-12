import React from 'react'
import ReactDOM from 'react-dom'
import {graphql, QueryRenderer} from 'react-relay'

import environment from './relay'

import { srcTestQuery } from './__generated__/srcTestQuery.graphql.js'

const App = () => {
  return  <QueryRenderer<srcTestQuery>
    environment={environment}
    query={graphql`
      query srcTestQuery {
        country(code: "US") {
          name
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
      return <div>User ID: {props.country?.name}</div>
    }}
  />
}

ReactDOM.render(<App />, document.querySelector('#root'))
