import { createStore } from 'vuex'
import axios from 'axios'

const BACKEND_URL = require('../../networkconfig.json').BACKEND_URL
// The user that's currently logged in
const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
//status reflects if the user is logged in
const userState =
  token
    ?
    { status: { isLoggedIn: true }, token, user }
    :
    { status: { isLoggedIn: false }, token: null, user: null }


// Create a new store instance.
const store = createStore({
  state() {
    return userState
  },
  mutations: {
    loginSuccessful(state, token, user) {
      console.log("Login successful, setting user and token")
      state.status.isLoggedIn = true
      state.token = token
      state.user = user

    },
    logoutSuccessful(state) {
      state.status.isLoggedIn = false
      state.token = null
      state.user = null
    }
  },
  actions: {
    //login and store the user object locally
    login({ commit }, { username, password }) {
      console.log('Trying to log in with username %s and password %s', username, password)
      return new Promise((resolve, reject) => {
        let url = BACKEND_URL + "auth/login/"
        axios.post(url,
          {
            username: username,
            password: password
          })
          .then(response => {
            //login has been accepted
            let token = response.data.token
            console.log("Login accepted with token: " + token);
            //Set user and token
            let user = JSON.stringify(
              {
              'username': username
              })
            localStorage.setItem('user', user)
            localStorage.setItem('token', token)
            commit('loginSuccessful', token, user)
            resolve(response)
          })
          .catch(error => {
            //pass on error to view TODO: Handle error status within store
            let status = error.response.status
            console.log("Error status: " + status)
            reject(error)
          })
      })
    }
  },
})

export default store