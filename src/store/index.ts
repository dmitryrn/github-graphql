import { configureStore } from '@reduxjs/toolkit'

import { reducer as authReducer } from './auth'

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

export type Store = ReturnType<typeof store['getState']>
