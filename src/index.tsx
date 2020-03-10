import React from 'react'
import ReactDOM from 'react-dom'
import {graphql, QueryRenderer} from 'react-relay'

import environment from './relay'

const App = () => {
  return  <QueryRenderer
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
      return <div>User ID: {props.viewer.id}</div>
    }}
  />
}

ReactDOM.render(<App />, document.querySelector('#root'))
