import { rest } from 'msw'
import authComp from './authcomp'

export const authHandlers = [
    // Handles a POST /login request
    rest.post('/login', (req, res, ctx) => {
        var user = req.user
        var pwd = req.password

        //check if user exists
        if (authComp.userExists(user)){
            //check if credentials are correct
            if (authComp.checkLogin(user, pwd) == true) {
                //respond with 200 + token
                //       sessionStorage.setItem('is-authenticated', 'true') TODO
                //isAuthenticated is set by Frontend, not here
                let token = Math.random().toString(36).substr(2)
                return res(
                    // Respond with a 200 status code & token
                    ctx.status(200),
                    ctx.cookie({
                        'token': token
                    })
                )
            }
            //user exists, but pwd is wrong
            return res(
                ctx.status(401),
                ctx.text("Wrong password")
            )
        }
        //user doesn't exist
        return res(
            ctx.status(404),
            ctx.text("User doesn't exist")
        )
        
        


    }),

    // Handles a GET /user request
    rest.get('/user', (req, res, ctx) => {
        // Check if the user is authenticated in this session
        // const isAuthenticated = sessionStorage.getItem('is-authenticated')
        const isAuthenticated = authComp.isAuthenticated
        if (!isAuthenticated) {
            // If not authenticated, respond with a 403 error
            return res(
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Not authorized',
                }),
            )
        }
        // If authenticated, return a mocked user details
        return res(
            ctx.status(200),
            ctx.json(authComp.users),
        )
    }),
]