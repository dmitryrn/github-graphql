import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import { client } from './apollo'

import { store } from './store'

import { App } from './app'

const AppContainer = () => {
  return (
    <ReduxProvider store={store}>
      <CookiesProvider>
        <ApolloProvider client={client}>
          <Router>
            <App />
          </Router>
        </ApolloProvider>
      </CookiesProvider>
    </ReduxProvider>
  )
}

ReactDOM.render(<AppContainer />, document.querySelector('#root'))
