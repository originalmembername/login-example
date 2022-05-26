import { setupServer } from 'msw/node'
import { authHandlers } from './authHandlers.js'

export const authServer = setupServer(...authHandlers)