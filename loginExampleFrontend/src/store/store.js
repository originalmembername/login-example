import { createStore } from 'vuex'
import axios from 'axios'

const BACKEND_URL = require('../../networkconfig.json').BACKEND_URL
// The user that's currently logged in
const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
//status reflects if the user is logged in
const userState =
  token != null ?
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
      console.log("Token in store: " + state.token)
      console.log("Token in LocalStorage: " + localStorage.getItem('token'))
    },
    logoutSuccessful(state) {
      state.status.isLoggedIn = false
      state.token = null
      state.user = null
      console.log("Logout should've been successful")
    },
    setUserInfo(state, user) {
      if (user == null) {
        //this basically equals a logout
        state.status.isLoggedIn = false
        state.token = null
        state.user = null
        return
      }
      state.user = user
      console.log("Set userInfo in store:")
      console.dir(user)
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
            let status = error.response.status
            console.log("Error status: " + status)
            reject(error)
          })
      })
    },
    logout({ commit }) {
      //get token
      let token = localStorage.getItem('token')
      if (token != null) {
        //Logout from server
        let url = BACKEND_URL + "auth/logout/"
        axios.defaults.headers.common['Authorization'] = `Token ${token}`
        axios.post(url, {}).then(() => {
          console.log("Logout from Server successful")
        }).catch(error => {
          console.error("Token couldn't be removed from server " + error)
        })
      }
      else {
        //no local token, something went wrong
        console.error("Local Token found missing while logging out")

      }
      //remove token and user locally
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      axios.defaults.headers.common['Authorization'] = null
      console.log("Logout complete, removed local token and user info")
      commit('logoutSuccessful')
    },
    //Register doesn't trigger a mutation in FE, but in BE, therefore is also a state change
    register(_, { newUser }) {
      console.log("Trying to register new user")
      console.dir(newUser)
      return new Promise((resolve, reject) => {
        let url = BACKEND_URL + "user/create/"
        axios.post(url, newUser).then(response => {
          //registration successful                
          console.log(response)
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    fetchUserInfo({ commit }, token = null) {
      if (!token) {
        //assume token is already stored locally
        token = this.state.token
      }
      //get user info from server
      return new Promise((resolve, reject) => {
        let url = BACKEND_URL + "user/"
        console.log("Local Token: " + token)
        axios.defaults.headers.common['Authorization'] = `Token ${token}`
        axios.get(url, {}).then(response => {
          commit('setUserInfo', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
})

export default store