import axios from "axios";

const authService = new Object({
    isAuthenticated: false,
    token: null,
    HTTPCodes: {
        OK: 200,
        USER_DOESNT_EXIST: 404,
        WRONG_PASSWORD: 401
    },

    login: async function (user, password) {
        return new Promise((resolve, reject) => {
            axios.post('/login/auth', {
                params: {
                    'user': user,
                    'password': password
                }
            })
                .then(response => {
                    //login has been accepted
                    let token = response.data.token
                    console.log("Login accepted with token: " + token);
                    //Set authenticated to "true" and store token
                    this.isAuthenticated = true
                    this.token = token
                    resolve(response)
                })
                .catch(error => {
                    //pass on error to view
                    let status = error.response.status
                    console.log("Error status: " + status)
                    reject(error)
                })
        }
        )

    }
})

export default authService