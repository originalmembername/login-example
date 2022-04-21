<template>
  <div class="home">
    <img alt="Plagwith painting" src="../assets/plagwitz2.jpg">
    <HomeComp msg="Welcome to Peter's picture shop"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComp from '@/components/HomeComp.vue'

export default {
  name: 'HomeView',
  components: {
    HomeComp
  }
}
</script>
