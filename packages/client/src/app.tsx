import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import { Repos } from './repos'
import { Auth } from './auth'

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
