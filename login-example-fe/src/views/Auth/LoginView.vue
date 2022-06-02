<template>
    <div id="login" class="container">
        <form>
            <h1>Login</h1>
            <div class="row"><input type="text" name="username" v-model="input.username" placeholder="Username" />
                <div v-if="v$.input.username.$error" class="alert alert-warning" role="alert">
                    Username cannot be empty
                </div>
            </div>
            <div class="row"><input type="password" name="password" v-model="input.password" placeholder="Password" />
                <div v-if="v$.input.password.$error" class="alert alert-warning" role="alert">
                    Password cannot be empty
                </div>
            </div>

            <button type="button" v-on:click="login()">Login</button>
        </form>



    </div>
</template>

<script>
/* eslint-disable no-debugger */
import axios from 'axios';
import authComp from '@/components/Auth/authcomp';
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
    name: 'LoginView',
    data() {
        return {
            v$: useValidate(),
            input: {
                username: "",
                password: ""
            }
        }
    },
    validations() {
        return {
            input: {
                username: { required },
                password: { required }
            }
        }
    },

    methods: {
        async login() {
            //validate form, cancel if there are errors
            this.v$.$validate()
            if (this.v$.$error) {
                return
            }
            //Get username and password
            let user = this.input.username
            let pwd = this.input.password
            //send login request to server
            axios.post('/login/auth', {
                params: {
                    'user': user,
                    'password': pwd
                }
            })
                .then(response => {
                    //login has been accepted
                    let token = response.data.token
                    console.log("Login accepted with token: " + token);
                    //Set authenticated to "true" and store token
                    authComp.isAuthenticated = true
                    authComp.token = token
                    //tell isAuthenticated to App component, so header can be adapted
                    this.$emit("authenticated");
                    //forward to restricted member page                      
                    this.$router.push("/member");
                })
                .catch(error => {
                    let status = error.response.status
                    console.log("Error status: " + status)
                    if (status == 401) {
                        //Wrong password
                        console.log("Wrong password")
                        this.resetInput()
                        return
                    }
                    if (status == 404) {
                        //user doesn't exist
                        console.log("User doesn't exist")
                        this.resetInput()
                        return
                    }
                    //if other error status, this shouldn't happen
                    throw error
                })
        },
        async resetInput() {
            console.log("Resetting login input fields")
            this.input.username = ""
            this.input.password = ""
            this.v$.$reset()
        }
    },
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

button {
    margin: 5px;
}
</style>