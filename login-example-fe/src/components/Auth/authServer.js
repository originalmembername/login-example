import { setupWorker } from "msw"
//import { authHandlers } from "./authHandlers"
import { rest } from "msw"


//export const authServer = setupServer(...authHandlers)

//start the auth Server
export function startMockServer() {
//    let worker = setupWorker(...authHandlers)
    let worker = setupWorker(
        // Provide request handlers
        rest.get('/login/auth', (req, res, ctx) => {
          return res(
            ctx.json({
              firstName: 'John',
              lastName: 'Maverick',
            }),
          )
        }),
      )
    worker.start()
}