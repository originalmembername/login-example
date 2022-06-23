<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">Edit Profile</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"> </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-4">
                    <h5 class="">Profile Picture</h5>
                </div>
                <div class="col-md-8"><img class="img-fluid d-block rounded-circle mx-auto"
                        src="@/assets/Sample_User_Icon.png" width="100" height="100"></div>
            </div>
            <!-- This is where the user info starts -->
            <form action="">
                <div class="container">
                    <div class="input-group input-group-sm">
                        <div class="col-sm-3">
                            <span class="input-group-text" id="firstname-input" style="width:90px"><small>First
                                    Name</small></span>
                        </div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" placeholder="e.g. John">
                        </div>
                    </div>
                    <div class="input-group input-group-sm">
                        <div class="col-sm-3">
                            <span class="input-group-text" id="lastname-input"
                                style="width:90px"><small>Name</small></span>
                        </div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" placeholder="e.g. Miller">
                        </div>
                    </div>
                    <div class="input-group input-group-sm">
                        <div class="col-sm-3">
                            <span class="input-group-text" id="email-input"
                                style="width:90px"><small>Email</small></span>
                        </div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" placeholder="e.g. johnmiller@example.com">
                        </div>
                    </div>
                    <div class="input-group input-group-sm">
                        <div class="col-sm-3">
                            <span class="input-group-text" id="city-input" style="width:90px"><small>City</small></span>
                        </div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" placeholder="e.g. Berlin">
                        </div>
                    </div>
                    <div class="input-group input-group-sm">
                        <div class="col-sm-3">
                            <span class="input-group-text" style="width:90px"><small>Password</small></span>
                        </div>
                        <div class="col-sm-6">
                            <input type="password" class="form-control-plaintext ms-2" placeholder="xxxxxxx" readonly>
                        </div>
                        <div class="col-md-3">
                            <!-- This button loads the "Change Password"-dialogue into the same modal -->
                            <button type="button" v-on:click="openChangePasswordView()" class="btn btn-warning btn-sm">Change Password</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditProfileModalContent',
    methods: {
        openChangePasswordView() {
            console.log("Using emit")
            //replace the edit-profile-view with the change-password-view
            this.$emit('show-change-password-view', true)
        }
    }
}
</script>