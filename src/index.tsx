import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { store } from './store'

import { App } from './app'

const AppContainer = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<AppContainer />, document.querySelector('#root'))
// https://github.com/login/oauth/authorize?client_id=Iv1.01c1dcafb5618fff&redirect_uri=http://localhost:9000
