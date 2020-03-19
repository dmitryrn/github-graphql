import { configureStore } from '@reduxjs/toolkit'

import { reducer as authReducer } from './auth'

import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const token = cookies.get('token')

const preloadedState = token?.length
  ? {
      auth: {
        token
      }
    }
  : undefined

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState
})

export type Store = ReturnType<typeof store['getState']>
