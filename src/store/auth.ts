import { createAction, createReducer, createSelector } from '@reduxjs/toolkit'
import { Selector } from 'react-redux'

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

export const isAuthenticatedSelector: Selector<State, boolean> = createSelector(
  state => typeof state.token === 'string',
  _ => _
)
