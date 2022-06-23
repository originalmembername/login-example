<template>
    <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch modal
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
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
                                        <span class="input-group-text" id="firstname-input"
                                            style="width:90px"><small>First Name</small></span>
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
                                        <span class="input-group-text" id="city-input"
                                            style="width:90px"><small>City</small></span>
                                    </div>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder="e.g. Berlin">
                                    </div>
                                </div>
                                <div class="input-group input-group-sm">
                                    <div class="col-sm-3">
                                        <span class="input-group-text" style="width:90px"><small>Password</small></span>
                                    </div>
                                    <div class="col-sm-9">
                                        <input type="password" class="form-control-plaintext ms-2" placeholder="xxxxxxx"
                                            readonly>
                                    </div>
                                </div>
                            </div>

                        </form>
                        <!-- <div class="row">
                            <div class="col-md-4">
                                <h5 class="" contenteditable="true">Last Name</h5>
                            </div>
                            <div class="col-md-8"><input type="text" class="form-control form-control-lg"
                                    id="inlineFormInputGroup" placeholder="Doe" v-required="true"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <h5 class="" contenteditable="true">Email</h5>
                            </div>
                            <div class="col-md-8"><input type="email" class="form-control form-control-lg"
                                    id="inlineFormInputGroup" placeholder="somemail@example.com" v-required="true">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4" style="">
                                <h5 class="">City</h5>
                            </div>
                            <div class="col-md-8" style=""><input type="text" class="form-control form-control-lg"
                                    id="inlineFormInputGroup" v-required="true" placeholder="Berlin"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-4" style="">
                                <h5 class="">Password</h5>
                            </div>
                            <div class="col-md-5" style=""><input type="password" class="form-control form-control-lg"
                                    id="inlineFormInputGroup" v-required="true" placeholder="xxxxxx"></div>
                            <div class="col-md-3" style=""><a class="btn btn-info btn-block active btn-lg"
                                    href="#">Change</a></div>
                        </div> -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "bootstrap/dist/js/bootstrap.min.js";
export default {

}
</script>
