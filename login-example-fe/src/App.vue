<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link v-if="!authComp.authStatus" to="/login">Login</router-link>
    <router-link v-if="authComp.authStatus" to="/login" v-on:click="logout()" replace
      >Logout</router-link
    >
  </nav>
  <router-view @authenticated="setAuthenticated" />
</template>

<script>
import AuthCompVue from './components/AuthComp.vue';
export default {
  name: "App",
  data() {
    return {
      authComp: AuthCompVue
    };
  },
/*   mounted() {
    if (!this.authenticated) {  
      this.$router.replace({ name: "login" });
    }
  }, */
  methods: {
    setAuthenticated(status) {
      this.authComp.authStatus = status;
      console.log("Set Auth Status to: " + this.authComp.authStatus)
    },
    logout() {
      this.authComp.authStatus = false;
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
