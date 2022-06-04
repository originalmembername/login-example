import { rest } from 'msw'
import authComp from './authcomp'

export const authHandlers = [
    rest.post('/login/auth', (req, res, ctx) => {
        //login request
        var user = req.body.params.user
        var pwd = req.body.params.password
        console.log("New login request, user: " + user + " password: " + pwd)

        //check if user exists
        if (authComp.userExists(user)) {
            //check if credentials are correct
            if (authComp.checkLogin(user, pwd) == true) {
                //respond with 200 + token
                //       sessionStorage.setItem('is-authenticated', 'true') TODO
                //isAuthenticated is set by Frontend, not here
                let token = Math.random().toString(36).substr(2)
                console.log("Login request accepted, new token: " + token)
                return res(
                    // Respond with a 200 status code & token
                    ctx.status(200),
                    ctx.json({
                        'token': token
                    })
                )
            }
            //user exists, but pwd is wrong
            console.log("Wrong password")
            return res(
                ctx.status(401),
                ctx.text("Wrong password")
            )
        }
        //user doesn't exist
        console.log("User doesn't exist")
        return res(
            ctx.status(404),
            ctx.text("User doesn't exist")
        )
    }),
    rest.post('/register/auth', (req, res, ctx) => {
        //login request
        var user = req.body.params.user
        var pwd = req.body.params.password
        console.log("New register request, user: " + user + " password: " + pwd)

        //check if user already exists, reject if so
        if (authComp.userExists(user)) {
            //user already exists
            console.log("User already exists")
            return res(
                ctx.status(403),
                ctx.text("User already exists")
            )
        }
        //create new user
        authComp.addUser(user, pwd)
        //return confirmation with username
        console.log("Created new user: " + user)
        return res(
            // Respond with a 200 status code & created username
            ctx.status(200),
            ctx.json({
                'user': user
            })
        )
    }),
    rest.get('/login/auth2', (req, res, ctx) => {
        return res(
            ctx.json({
                firstName: 'John2',
                lastName: 'Maverick2',
            }),
        )
    })
]

/* export const authHandlers = [
    // Handles a POST /login request
    rest.post('https://localhost:8080/login/auth', (req, res, ctx) => {
        var user = req.user
        var pwd = req.password
        console.log ("New login request, user: " + user)

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
] */