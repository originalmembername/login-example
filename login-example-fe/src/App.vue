<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="authenticated" to="/member" >My Area</router-link>
    <router-link v-if="!authenticated" to="/login">Login</router-link>
    <router-link v-if="!authenticated" to="/register">Register</router-link>
    <router-link v-if="authenticated" to="#" v-on:click="logout()" replace
      >Logout</router-link
    >
  </nav>
  <router-view @authenticated="updateAuthStatus" />
</template>

<script>
import authService from './services/authService';

export default {
  name: "App",
  data() {
    return {
      authenticated: authService.isAuthenticated
    };
  },    

  methods: {
    updateAuthStatus() {
      this.authenticated = authService.isAuthenticated;
      console.log("Set Auth Status to: " + authService.isAuthenticated)
    },
    logout() {
      authService.logout()      
      this.updateAuthStatus()
      console.log("Auth Status after logout: " + authService.isAuthenticated)
      this.$router.push({name: 'login', params: {justLoggedOut: true}})
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
