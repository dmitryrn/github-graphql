import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import { Repositories, Auth } from './components/pages'

import { useStore } from 'effector-react'

import { $token } from './store'

export const App = () => {
  const token = useStore($token)

  return (
    <>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>

        {!token && <Redirect push to="/auth" />}

        <Route exact path="/repos">
          <Repositories />
        </Route>

        <Route exact path="/">
          <Link to="/repos">repos</Link>
        </Route>

        <Redirect to="/" />
      </Switch>
    </>
  )
}
