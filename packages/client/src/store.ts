import { createStore, createEvent } from 'effector'

export const $token = createStore<string | null>(null)

export const setToken = createEvent<string>()

$token.on(setToken, (_, payload) => payload)
