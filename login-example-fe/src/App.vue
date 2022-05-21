<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link v-if="!authenticated" to="/login">Login</router-link>
    <router-link v-if="authenticated" to="/login" v-on:click="logout()" replace
      >Logout</router-link
    >
  </nav>
  <router-view @authenticated="updateAuthStatus" />
</template>

<script>
import authComp from '@/components/authcomp.js'

export default {
  name: "App",
  data() {
    return {
      authenticated: authComp.isAuthenticated
    };
  },  
  
/*   mounted() {
    if (!this.authenticated) {  
      this.$router.replace({ name: "login" });
    }
  }, */
  methods: {
    updateAuthStatus() {
      this.authenticated = authComp.isAuthenticated;
      console.log("Set Auth Status to: " + authComp.isAuthenticated)
    },
    logout() {
      authComp.isAuthenticated = false
      this.updateAuthStatus()
      console.log("Auth Status after logout: " + authComp.isAuthenticated)
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
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
