import axios from "axios";

const authService = new Object({
    HTTPCodes: {
        OK: 200,
        USER_DOESNT_EXIST: 404,
        DUPLICATE_USER: 403,
        WRONG_PASSWORD: 401
    },
    isAuthenticated: function(){
        return localStorage.getItem('token') != null
    },
    getToken: function() {
        return localStorage.getItem('token')
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
    register: async function (user, password) {
        return new Promise((resolve, reject) => {
            axios.post('/register/auth', {
                params: {
                    'user': user,
                    'password': password
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
        //remove login token for this user
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        //send logout request to server TODO
    }
})

function setAuthToken(user, token) {    
    //set token for this user; or token for undefined user
    if(user){
        localStorage.setItem('user', user)
    }    
    localStorage.setItem('token', token)
    console.log("Stored new token in local storage: " + localStorage.getItem('token'))
}

export default authService