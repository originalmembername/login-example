import { setupWorker } from 'msw/node'
import { rest } from 'msw'
//import { authHandlers } from './authHandlers.js'

//export const authWorker = setupWorker(...authHandlers)

export const worker = setupWorker(
    // Provide request handlers
    rest.get('/user/:userId', (req, res, ctx) => {
      return res(
        ctx.json({
          firstName: 'John',
          lastName: 'Maverick',
        }),
      )
    }),
  )