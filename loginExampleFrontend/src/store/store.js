import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      isLoggedIn: false
    }
  },
  mutations: {
    login (state) {
      state.isLoggedIn = true
    },
    logout (state) {
        state.isLoggedIn = false
    }
  }
})

export default store