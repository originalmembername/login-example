<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="authenticated" to="/member">My Area</router-link>
    <router-link v-if="!authenticated" to="/login">Login</router-link>
    <router-link v-if="!authenticated" to="/register">Register</router-link>
    <router-link v-if="authenticated" to="#" v-on:click="logout()" replace>Logout</router-link>
  </nav>
</template>