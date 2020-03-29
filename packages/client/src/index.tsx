import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import { client } from './apollo'

import { App } from './app'

const AppContainer = () => {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </CookiesProvider>
  )
}

ReactDOM.render(<AppContainer />, document.querySelector('#root'))
