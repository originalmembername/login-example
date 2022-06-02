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
    </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";

export default {
    data() {
        return {
            v$: useValidate(),
            input: {
                username: "",
                password: "",
                password2: ""
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
        async register() {
            //validate form, cancel if there are errors
            this.v$.$validate()
            if (this.v$.$error) {                
                return
            }
            console.log("For validation successful for new user: " + this.username)
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