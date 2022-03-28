<template>
<div>
  <h1>Welcome to the Login Example</h1>
</div>
  <img alt="Vue logo" src="./assets/LGL_logo.jpg">
  <StartpageComp msg="Go to our login page"/>
</template>

<script>
import StartpageComp from './components/StartpageComp.vue'

export default {
  name: 'App',
  components: {
    StartpageComp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
