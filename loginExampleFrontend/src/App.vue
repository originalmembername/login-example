<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="$store.state.status.isLoggedIn" to="/member">My Area</router-link>
    <router-link v-if="!$store.state.status.isLoggedIn" to="/login">Login</router-link>
    <router-link v-if="!$store.state.status.isLoggedIn" to="/register">Register</router-link>
    <router-link v-if="$store.state.status.isLoggedIn" to="#" v-on:click="logout()" replace>Logout</router-link>
  </nav>
  <router-view />
</template>

<script>

export default {
  name: "App",
  methods: {
    logout() {
      console.log("Trying to log out, local token: " + this.$store.state.token)
      this.$store.dispatch('logout')
      console.log("Auth Status after logout: " + this.$store.state.status.isLoggedIn)
      //redirect to logout page
      this.$router.push({ name: 'login', params: { justLoggedOut: true } })
    },
  },
};
</script>

<style lang="scss">
//set global style variables, override bootstrap defaults
@import "./styles/custom_variables"; 
@import "bootstrap/scss/bootstrap.scss";

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
