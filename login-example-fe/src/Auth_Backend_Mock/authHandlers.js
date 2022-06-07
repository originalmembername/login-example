import { rest } from 'msw'
import user_db from './user_db'

export const authHandlers = [
    rest.post('/login/auth', (req, res, ctx) => {
        //login request
        var user = req.body.params.user
        var pwd = req.body.params.password
        console.log("New login request, user: " + user + " password: " + pwd)

        //check if user exists
        if (user_db.userExists(user)) {
            //check if credentials are correct
            if (user_db.checkLogin(user, pwd) == true) {
                //respond with 200 + token
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
        var city = req.body.params.city
        console.log("New register request, user: " + user + " password: " + pwd)

        //check if user already exists, reject if so
        if (user_db.userExists(user)) {
            //user already exists
            console.log("User already exists")
            return res(
                ctx.status(403),
                ctx.text("User already exists")
            )
        }
        //create new user
        user_db.addUser(user, pwd, city)
        //return confirmation with username
        console.log("Created new user: " + user)
        return res(
            // Respond with a 200 status code & created username
            ctx.status(200),
            ctx.json({
                'user': user
            })
        )
    })
]