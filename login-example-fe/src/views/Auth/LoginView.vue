<template>
    <div id="login" class="container">
        <div id="logoutMessage" v-if="displayLogoutMessage">You have been successfully logged out</div>
        <form>
            <h1>Login</h1>
            <div class="row"><input type="text" name="email" v-model="input.email" placeholder="Email" />
                <div v-if="v$.input.email.$error" class="alert alert-warning" role="alert">
                    Must be valid email
                </div>
                <!-- Only if Server provides detailed info about rejection -->
                <div v-if="errors.userDoesnotExist && !v$.input.email.$error" class="alert alert-warning"
                    role="alert">
                    User doesn't exist
                </div>
            </div>
            <div class="row"><input type="password" name="password" v-model="input.password" placeholder="Password" />
                <div v-if="v$.input.password.$error" class="alert alert-warning" role="alert">
                    Password cannot be empty
                </div>
                <!-- Only if Server provides detailed info about rejection -->
                <div v-if="errors.passwordIncorrect && !v$.input.password.$error" class="alert alert-warning"
                    role="alert">
                    Password incorrect
                </div>
                <!-- Only if Server provides general rejection of login request, w/o detail -->
                <div v-if="errors.loginIncorrect && !v$.input.password.$error" class="alert alert-warning"
                    role="alert">
                    Email or Password incorrect
                </div>
            </div>

            <button type="button" v-on:click="login()">Login</button>
        </form>



    </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import authService from '@/services/authService.js'

export default {
    name: 'LoginView',
    data() {
        return {
            v$: useValidate(),
            displayLogoutMessage: false,
            input: {
                email: "",
                password: ""
            },
            errors: {
                userDoesnotExist: false,
                passwordIncorrect: false,
                loginIncorrect: false
            }
        }
    },
/*     props: {
        justLoggedOut: {
            type: Boolean,
            required: false
        }
    }, */
    validations() {
        return {
            input: {
                email: { required, email },
                password: { required }
            }
        }
    },

    methods: {
        login() {
            //validate form, cancel if there are errors
            this.errors.userDoesnotExist = false
            this.errors.passwordIncorrect = false
            this.errors.loginIncorrect = false
            this.v$.$validate()
            if (this.v$.$error) {
                return
            }
            //Get email and password
            let email = this.input.email
            let pwd = this.input.password
            //try to login
            authService.login(email, pwd).then(() => {
                //login was successful
                //tell App component to update header
                console.log("Auth Status: " + authService.isAuthenticated())
                this.$emit("authenticated")
                //forward to restricted member page                      
                this.$router.push("/member")
                return
            }
            ).catch(error => {
                let status = error.response.status
                console.log("Error status: " + status)
                if (status == authService.HTTPCodes.WRONG_PASSWORD) {
                    //Wrong password
                    console.log("Wrong password")
                    this.errors.passwordIncorrect = true
                    this.resetInput()
                    return
                }
                if (status == authService.HTTPCodes.USER_DOESNT_EXIST) {
                    //user doesn't exist
                    console.log("User doesn't exist")
                    this.errors.userDoesnotExist = true
                    this.resetInput()
                    return
                }
                if (status == authService.HTTPCodes.BAD_REQUEST) {
                    //email or password wrong, no detail
                    console.log("User or password wrong")
                    this.errors.loginIncorrect = true
                    this.resetInput()
                    return
                }
                //if other error status, this shouldn't happen
                throw error
            })
        },
        async resetInput() {
            console.log("Resetting login input fields")
            this.input.email = ""
            this.input.password = ""
            this.v$.$reset()
        }
    },
    created() {
        //check if we've just been logged out
        if(this.$route.params.justLoggedOut){
            this.displayLogoutMessage = true
            setTimeout(() => this.displayLogoutMessage = false, 3000)
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

button {
    margin: 5px;
}
</style>