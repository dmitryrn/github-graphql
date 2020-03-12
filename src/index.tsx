import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { Repos } from './repos'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/repos">
          <Repos />
        </Route>
        <Route path="/">
          <Link to="/repos">repos</Link>
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
