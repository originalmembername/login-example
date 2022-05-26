import { rest } from "msw"
import { setupWorker } from "msw"

//export const authServer = setupServer(...authHandlers)

//start the auth Server
export function startMockServer() {
    let worker = setupWorker(
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
    worker.start()
}