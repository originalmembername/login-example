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
                                        The password must be 8-20 characters and contain at least one: <br>
                                        Upper case letter, lower case letter, number, special character
                                    </span>
                                    <div class="alert alert-danger" role="alert"
                                        v-if="submitted && newPwdErrorMsg != ''" v-html="newPwdErrorMsg">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputPasswordNewVerify">Repeat new password</label>
                                    <input type="password" class="form-control" id="repeatNewPassword"
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
import { required, minLength, maxLength, sameAs, helpers } from '@vuelidate/validators'
import useValidate from '@vuelidate/core'

const customValidations = {
    fitsExpression: (regex) =>
        helpers.withParams(
            { type: 'fitsExpression', value: regex },
            (value) => {
                return regex.test(value)
            }
        )
}

export default {
    name: 'ChangePasswordModalContent',
    data() {
        return {
            v$: useValidate(),
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
        },
    },
    computed: {
        newPwdErrorMsg() {
            let msg = ""
            //Add message for each error
            if (this.v$.input.newPassword.required.$invalid) {
                msg += "Password cannot be empty"
                return msg
            }
            if (this.v$.input.newPassword.minLength.$invalid) {
                msg += "Password has to be at least 8 characters<br />"
            }
            if (this.v$.input.newPassword.maxLength.$invalid) {
                msg += "Password can be at maximum 20 characters<br />"
            }
            if (this.v$.input.newPassword.containsUppercase.$invalid) {
                msg += "Password must contain upper case character<br />"
            }
            if (this.v$.input.newPassword.containsLowercase.$invalid) {
                msg += "Password must contain lower case character<br />"
            }
            if (this.v$.input.newPassword.containsNumber.$invalid) {
                msg += "Password must contain number<br />"
            }
            if (this.v$.input.newPassword.containsSpecialChar.$invalid) {
                msg += "Password must contain special character:<br/> # ? ! @ $ € % ^ & * -"
            }
            return msg
        },
    },
    validations() {
        return {
            input: {
                oldPassword: { required },
                newPassword: {
                    required, minLength: minLength(8), maxLength: maxLength(20),
                    containsUppercase: customValidations.fitsExpression(/[A-Z]/),
                    containsLowercase: customValidations.fitsExpression(/[a-z]/),
                    containsNumber: customValidations.fitsExpression(/[0-9]/),
                    containsSpecialChar: customValidations.fitsExpression(/[#?!@$€%^&*-]/)
                },
                confirmNewPassword: { required, sameAs: sameAs('newPassword') },
            }

        }

    }

}
</script>