import { createAction, createReducer, createSelector } from '@reduxjs/toolkit'
import { Selector } from 'react-redux'

import { Store } from './index'

type State = {
  token: string | null
}

const initialState: State = {
  token: null
}

export const setToken = createAction<string | null>('auth/setToken')

export const reducer = createReducer(initialState, builder =>
  builder.addCase(setToken, (state, action) => {
    state.token = action.payload
  })
)

const reducerStoreSelector: Selector<Store, State> = state => state.auth

// Selectors
export const isAuthenticatedSelector = createSelector(
  reducerStoreSelector,
  state => typeof state.token === 'string'
)
