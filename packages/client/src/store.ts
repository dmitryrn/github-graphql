import { createStore, createEvent } from 'effector'

export const $token = createStore<string | null>(localStorage.getItem('token'))

export const setToken = createEvent<string>()

$token.on(setToken, (_, payload) => {
  localStorage.setItem('token', payload)
  return payload
})
