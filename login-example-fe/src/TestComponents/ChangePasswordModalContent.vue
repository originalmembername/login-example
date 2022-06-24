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
                                    <div class="alert alert-danger" role="alert" v-if="submitted && newPwdErrorMsg!=''">
                                        {{newPwdErrorMsg}}
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

export default {
    name: 'ChangePasswordModalContent',
    setup() {
        return { v$: useValidate() }
    },
    data() {
        return {
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
        }
    },
    computed: {
        newPwdErrorMsg() {
            let msg = ""
            //Add message for each error
            if (this.v$.input.newPassword.required.$invalid){
                msg += "\nPassword cannot be empty"
            }
            return msg
        },
        containsUppercase: function (value) {
            return !/[A-Z]/.test(value)
        },
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
    validations() {
        return {
            input: {
                oldPassword: { required },
                newPassword: { required, minLength: minLength(8), maxLength: maxLength(20) },
                confirmNewPassword: { required, sameAs: sameAs('newPassword') },
            }

        }

    }

}
</script>