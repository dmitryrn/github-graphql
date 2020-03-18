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
      {!isAuthenticated && <Redirect push to="/auth" />}
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/repos">
          <Repos />
        </Route>
        <Route path="/">
          <Link to="/repos">repos</Link>
        </Route>
      </Switch>
    </>
  )
}
