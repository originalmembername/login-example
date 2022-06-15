import axios from "axios";

const authService = new Object({
    HTTPCodes: {
        OK: 200,
        USER_DOESNT_EXIST: 404,
        DUPLICATE_USER: 403,
        WRONG_PASSWORD: 401,
        BAD_REQUEST: 400
    },
    isAuthenticated: function () {
        return localStorage.getItem('token') != null
    },
    getToken: function () {
        return localStorage.getItem('token')
    },
    login: async function (user, password) {
        return new Promise((resolve, reject) => {
            axios.post("http://127.0.0.1:8000/auth/login/",
                {
                    username: user,
                    password: password
                })
                .then(response => {
                    //login has been accepted
                    let token = response.data.token
                    console.log("Login accepted with token: " + token);
                    //Set authenticated to "true" and store token
                    setAuthToken(user, token)
                    //                    this.isAuthenticated = true
                    //                    this.token = token
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

    },
    register: async function (user, password, city) {
        return new Promise((resolve, reject) => {
            axios.post('/register/auth', {
                params: {
                    'user': user,
                    'password': password,
                    'city': city
                }
            }).then(response => {
                //registration was successful
                resolve(response)
            }).catch(error => {
                //registration was unsuccessful, pass error onto view
                reject(error)
            })
        })
    },
    logout: async function () {
        return new Promise((resolve, reject) => {
            let token = localStorage.getItem('token')
            if (token == null) {
                reject(new Error({ message: "Token " + token + " doesn't exist in local storage" }))
            }
            //remove local token for this user
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            console.log("Token " + token + " was removed locally")

            //send logout request to server to remove token there as well
            axios.post('/logout', {
                params: {
                    'token': token
                }
            }).then(response => {
                //logout was successful
                console.log("Server confirmed removal of token: " + token)
                resolve(response)
            }).catch(error => {
                //Token on Server couldn't be removed, or wasn't there, but we're logged out anyway
                reject(error)
            })
        })
    },
    getUserInfo: async function (token) {
        return new Promise((resolve, reject) => {
            let json = require('../../networkconfig.json')
            let url = json.BACKEND_URL + "auth/user/"
            console.log("Sending token auth request to " + url)
            axios.get(url, {
                params: {
                    'Token': token
                }
            }).then(response=> {
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    }
})

function setAuthToken(user, token) {
    //set token for this user; or token for undefined user
    if (user) {
        localStorage.setItem('user', user)
    }
    localStorage.setItem('token', token)
    console.log("Stored new token in local storage: " + localStorage.getItem('token'))
}

export default authService