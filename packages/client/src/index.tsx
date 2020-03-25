import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import { store } from './store'

import { App } from './app'

const AppContainer = () => {
  return (
    <ReduxProvider store={store}>
      <CookiesProvider>
        <Router>
          <App />
        </Router>
      </CookiesProvider>
    </ReduxProvider>
  )
}

ReactDOM.render(<AppContainer />, document.querySelector('#root'))
