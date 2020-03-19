import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import { isAuthenticatedSelector } from './store/auth'

import { Repos } from './repos'
import { Auth } from './auth'

export const App = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector)

  return (
    <>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>

        {!isAuthenticated && <Redirect push to="/auth" />}

        <Route exact path="/repos">
          <Repos />
        </Route>

        <Route exact path="/">
          <Link to="/repos">repos</Link>
        </Route>

        <Redirect to="/" />
      </Switch>
    </>
  )
}
