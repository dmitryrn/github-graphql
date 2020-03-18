import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { reducer as authReducer } from './auth'

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer
  })
})
