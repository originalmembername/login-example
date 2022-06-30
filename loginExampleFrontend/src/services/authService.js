import axios from "axios";

const authService = new Object({
    HTTPCodes: {
        OK: 200,
        USER_DOESNT_EXIST: 404,
        DUPLICATE_USER: 403,
        WRONG_PASSWORD: 401,
        BAD_REQUEST: 400
    },
    BACKEND_URL: require('../../networkconfig.json').BACKEND_URL,
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
    
    //user: The user object with info like email, username, password etc.
    register: async function (user) {
        return new Promise((resolve, reject) => {
            let url = this.BACKEND_URL + "user/create/"
            axios.post(url, user).then(response => {
                //registration successful                
                console.log(response)
                resolve(response)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    logout: async function () {
        return new Promise((resolve, reject) => {
            let token = localStorage.getItem('token')
            if (token == null) {
                console.error("Local token is missing!")
                reject(new Error({ message: "Token doesn't exist in local storage" }))
            }
            //send logout request to server to remove token there
            let url = this.BACKEND_URL + "auth/logout/"
            axios.defaults.headers.common['Authorization'] = `Token ${token}`
            axios.post(url, {}).then(response => {
                //logout was successful
                console.log("Server confirmed removal of token: " + token)
                resolve(response)
            }).catch(error => {
                //Token on Server couldn't be removed, or wasn't there
                reject(error)
            }).finally(() => {
                //remove local  user & token in each case
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                axios.defaults.headers.common['Authorization'] = null
                console.log("Local token should've been removed, new Auth Status " + this.isAuthenticated())
            })
        })
    },
    getUserInfo: async function (token) {
        return new Promise((resolve, reject) => {
            let url = this.BACKEND_URL + "user/"
            console.log("Sending token auth request to " + url)
            console.log("Local Token: " + token)
            axios.defaults.headers.common['Authorization'] = `Token ${token}`
            axios.get(url, {}).then(response => {
                resolve(response)
            }).catch(error => {
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