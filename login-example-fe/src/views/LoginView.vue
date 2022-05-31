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
import axios from 'axios';

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
        async login() {
            //Get username and password
            let user = this.input.username
            let pwd = this.input.password
            if (user != "" && pwd != "") {

                //send login request to server
                axios.post('/login/auth', {
                    params: {
                        'user': user,
                        'password': pwd
                    }
                })
                    .then( response => {
                        console.log("Response: " + response);
                    })
                    .catch( error => {
                        let status = error.response.status
                        console.log("Error status: " + status)
                        if(status == 401){
                            //Wrong password
                            console.log("Wrong password")
                            this.resetInput()
                            return
                        }
                        if(status == 404){
                            //user doesn't exist
                            console.log("User doesn't exist")
                            this.resetInput()
                            return
                        }
                        //if other error status, this shouldn't happen
                        throw error
                    })



                /* axios.post('https://localhost:8080/login/auth', {
                    user: this.username,
                    password: this.password
                })
                    .then(function (response) {
                        console.log("Response: " + response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    }); */

                /*  //Check username & password
                 if (this.input.username == MockServerComp.data().username && this.input.password == MockServerComp.data().password) {
                     console.log("Login successful")
                     //Set authenticated to "true"
                     authComp.isAuthenticated = true
                     console.log("authComp.isAuthenticated: " + authComp.isAuthenticated)
                     //tell isAuthenticated to App component, so header can be adapted
                     this.$emit("authenticated");
                     this.$router.push("/member");
                 } else {
                     console.log("The username and / or password is incorrect");
                 } */
            } else {
                console.log("A username and password must be present");
            }
        },
        async resetInput() {
            console.log ("Resetting login input fields")
            this.input.username = ""
            this.input.password = ""
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