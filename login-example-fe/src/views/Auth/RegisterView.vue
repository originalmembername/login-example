<template>
    <div id="register" class="container">
        <h1>Register</h1>
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
        <div class="row"><input type="password" name="password2" v-model="input.password2"
                placeholder="Repeat Password" />
            <div v-if="v$.input.password2.$error" class="alert alert-warning" role="alert">
                Both passwords must be identical
            </div>
        </div>
        <button type="button" v-on:click="register()">Register</button>
        <div v-if="errors.userAlreadyExists" class="alert alert-danger" role="alert">
            User {{ errors.duplicateUser }} already exists
        </div>
    </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
import authService from '@/services/authService';

export default {
    data() {
        return {
            v$: useValidate(),
            input: {
                username: "",
                password: "",
                password2: ""
            },
            errors: {
                userAlreadyExists: false,
                duplicateUser: ""
            }
        }
    },
    validations() {
        return {
            input: {
                username: { required },
                password: { required },
                password2: { required, sameAsPassword: sameAs(this.input.password) }
            }
        }
    },
    methods: {
        register() {
            this.errors.duplicateUser = ""
            this.errors.userAlreadyExists = false
            //validate form, cancel if there are errors
            this.v$.$validate()
            if (this.v$.$error) {
                return
            }
            //send registration request to server
            let user = this.input.username
            let pwd = this.input.password
            console.log("Trying register request for new user: " + user)
            //try to register new user
            authService.register(user, pwd).then(() => {
                //user has been successfully created
                //show success screen; pass on username to be displayed there
                this.$router.push({ name: 'registerSuccess', params: { user: user } })
                return
            }).catch(error => {
                let status = error.response.status
                console.log("Error status: " + status)
                if (status == authService.httpCodes.DUPLICATE_USER) {
                    //User already exists
                    console.log("User already exists")
                    this.errors.duplicateUser = this.input.username
                    this.errors.userAlreadyExists = true
                    this.input.username = ""
                    this.v$.$reset()
                    return
                }
                //something else happened
                throw error
            })
        }
    }
}

</script>

<style scoped>
#register {
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