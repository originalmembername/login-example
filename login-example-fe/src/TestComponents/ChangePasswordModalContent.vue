<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">Change Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"> </button>
        </div>
        <div class="modal-body">
            <form action="">
                <div class="container">
                    <h1>Change Password</h1>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save new password</button>
            <button type="button" v-on:click="closeView()" class="btn btn-secondary">Close without saving</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangePasswordModalContent',
    methods: {
        closeView() {
            //close this view to show the "normal" edit profile view again
            this.$emit('show-change-password-view', false)
        }
    }
}
</script>