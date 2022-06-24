<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">Change Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"> </button>
        </div>
        <div class="modal-body">
            <form action="">
                <div class="container">
                    <div class="card card-outline-secondary">
                        <div class="card-body">
                            <form class="form" role="form" autocomplete="off">
                                <div class="form-group">
                                    <label for="inputPasswordOld">Current Password</label>
                                    <input type="password" class="form-control" id="inputPasswordOld"
                                        v-model="input.oldPassword">
                                    <div class="alert alert-danger" role="alert" v-if="errors.oldPwdIncorrect">
                                        Old password is incorrect
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputPasswordNew">New Password</label>
                                    <input type="password" class="form-control" id="inputPasswordNew"
                                        v-model="input.newPassword">
                                    <span class="form-text small text-muted">
                                        The password must be 8-20 characters, and must <em>not</em> contain spaces.
                                    </span>
                                    <div class="alert alert-danger" role="alert"
                                        v-if="submitted && newPwdErrorMsg != ''">
                                        {{ newPwdErrorMsg }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputPasswordNewVerify">Verify</label>
                                    <input type="password" class="form-control" id="inputPasswordNewVerify"
                                        v-model="input.confirmNewPassword">
                                    <span class="form-text small text-muted">
                                        To confirm, type the new password again.
                                    </span>
                                    <div class="alert alert-danger" role="alert" v-if="errors.pwdNotIdentical">
                                        Passwords don't match
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="submitNewPwd()">Save new password</button>
            <button type="button" v-on:click="closeView()" class="btn btn-secondary">Close without saving</button>
        </div>
    </div>
</template>

<script>
import { required, minLength, maxLength, sameAs } from '@vuelidate/validators'
import useValidate from '@vuelidate/core'
//import useVuelidate from '@vuelidate/core'

// eslint-disable-next-line no-unused-vars
const customValidations = {
    containsUppercase: function (value) {
        console.log(value + "contains upper case: " + /[A-Z]/.test(value))
        if (value == "") {
            return false
        }
        return !/[A-Z]/.test(value)
    }
}

export default {
    name: 'ChangePasswordModalContent',
    data() {
        return {
            v$: useValidate(),
            //           v$: useVuelidate(),
            submitted: false,
            input: {
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            },
            errors: {
                oldPwdIncorrect: false,
                pwdNotIdentical: false,
                newPwdError: false
            }

        }
    },
    methods: {
        closeView() {
            //close this view to show the "normal" edit profile view again
            this.$emit('show-change-password-view', false)
        },
        submitNewPwd: async function () {
            this.submitted = true
            this.v$.$validate()
            console.dir(this.v$.input.newPassword)
        },
        /*         containsUppercase: function (value) {
                    console.log(value + "contains upper case: " + !/[A-Z]/.test(value))
                    // eslint-disable-next-line no-debugger
                    return !/[A-Z]/.test(value)
                },  */
        containsLowercase: function (value) {
            return !/[a-z]/.test(value)
        },
        containsNumber: function (value) {
            return !/[0-9]/.test(value)
        },
        containsSpecial: function (value) {
            return !/[#?!@$%^&*-]/.test(value)
        }
    },
    computed: {
        newPwdErrorMsg() {
            let msg = ""
            //Add message for each error
            if (this.v$.input.newPassword.required.$invalid) {
                msg += "\nPassword cannot be empty"
            }
            if (this.v$.input.newPassword.minLength.$invalid) {
                msg += "\nPassword has to be at least 8 characters"
            }
            if (this.v$.input.newPassword.maxLength.$invalid) {
                msg += "\nPassword can be at maximum 20 characters"
            }
            /*             if (this.v$.input.newPassword.containsUppercase.$invalid) {
                            msg += "\nPassword must contain upper case character"
                        } */
            return msg
        },
    },
    validations() {
        return {
            input: {
                oldPassword: { required },
                newPassword: { required, minLength: minLength(8), maxLength: maxLength(20), containsUppercase: customValidations.containsUppercase(this.input.newPassword) },
                confirmNewPassword: { required, sameAs: sameAs('newPassword') },
            }

        }

    }

}
</script>