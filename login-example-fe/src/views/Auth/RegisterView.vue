<template>
    <div id="register" class="container">
        <h1>Register</h1> 
        <div class="row"><input type="text" name="firstName" v-model="input.firstName" placeholder="First Name" />
            <div v-if="v$.input.firstName.$error" class="alert alert-warning" role="alert">
                {{v$.input.firstName.$errors[0].$message}}
            </div>
        </div>       
        <div class="row"><input type="text" name="lastName" v-model="input.lastName" placeholder="Last Name" />
            <div v-if="v$.input.lastName.$error" class="alert alert-warning" role="alert">
                {{v$.input.lastName.$errors[0].$message}}
            </div>
        </div>  
        <div class="row"><input type="text" name="email" v-model="input.email" placeholder="Email" />
            <div v-if="v$.input.email.$error" class="alert alert-warning" role="alert">
                Must be valid Email
            </div>
        </div>
        <div class="row"><input type="text" name="username" v-model="input.username" placeholder="Username (optional)" />
            <div v-if="v$.input.username.$error" class="alert alert-warning" role="alert">
                Must be valid username
            </div>
        </div>
        <div class="row"><input type="text" name="city" v-model="input.city" placeholder="City (optional)" />
            <div v-if="v$.input.city.$error" class="alert alert-warning" role="alert">
                No valid city name
            </div>
        </div>
        <div class="row"><input type="password" name="password" v-model="input.password" placeholder="Password" />
            <div v-if="v$.input.password.$error" class="alert alert-warning" role="alert">
                {{v$.input.password.$errors[0].$message}}
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
import { required, sameAs, email, minLength, maxLength } from "@vuelidate/validators";
import authService from '@/services/authService';
import validations from '@/helpers/validations'

export default {
    data() {
        return {
            v$: useValidate(),
            input: {
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                city: "",
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
                firstName: {required, letter_or_number: validations.fitsExpression(validations.letters_or_numbers)},
                lastName: {required, letter_or_number: validations.fitsExpression(validations.letters_or_numbers)},
                username: {letter_or_number: validations.fitsExpression(validations.letters_or_numbers) },
                email: { email, required },
                city: { letter_or_number: validations.fitsExpression(validations.letters_or_numbers) },
                password: {
                     required,
                     minLength: minLength(8),
                     maxLength: maxLength(20),
                     containsUppercase: validations.fitsExpression(validations.contains_uppercase),
                     containsLowercase: validations.fitsExpression(validations.contains_lowercase),
                     containsNumber: validations.fitsExpression(validations.contains_number),
                     containsSpecialChar: validations.fitsExpression(validations.contains_special_char),
                     noSpaces: validations.fitsExpression(validations.no_spaces),
                     },
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
                //console.dir(this.v$)
                return
            }
            //send registration request to server
            console.log("Trying to register user")
            authService.register(this.input.username, this.input.email, this.input.city, this.input.password).then(() => {
                //user has been successfully created
                //show success screen; pass on username to be displayed there
                this.$router.push({ name: 'registerSuccess', params: { user: this.input.username } })
                return
            }).catch(error => {
                let status = error.response.status
                console.log("Error status: " + status)
                if (status == authService.HTTPCodes.DUPLICATE_USER) {
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