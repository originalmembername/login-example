<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
/* eslint-disable no-debugger */
import MockServerComp from '@/components/MockServerComp.vue'
import AuthComp from '@/components/AuthComp.vue'
export default {
    name: 'LoginView',
    data() {
        return {
            input: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            //Get username and password
            console.log("Username " + this.input.username)
            console.log("MockAccount Username " + MockServerComp.data().username)
            if (this.input.username != "" && this.input.password != "") {
                //Check username & password
                if (this.input.username == MockServerComp.data().username && this.input.password == MockServerComp.data().password) {
                    console.log("Login successful")
                    //Set authenticated to "true"
                    //this.$emit("authenticated", true);
                    AuthComp.authStatus = true
                    console.log("AuthComp.authenticated: " + AuthComp.authStatus)
                    this.$router.push("/member");
                } else {
                    console.log("The username and / or password is incorrect");
                }
            } else {
                console.log("A username and password must be present");
            }
        }
    }
}
</script>

<style scoped>
#login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
}
</style>