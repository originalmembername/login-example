<template>
    <div class="container">
        <div class="col-sm-12">
            <!--header-->
            <h1 class="text-center shadow border bg-primary"
                style="	border-left-width: 20px;	border-right-width: 20px;">Profile</h1>
            <div class="row">
                <!-- Profile info: Image left/up, then info -->
                <div class="col-sm-4">
                    <img class="img-fluid d-block rounded-circle float-left shadow-none border"
                        src="../assets/Sample_User_Icon.png" style="height: 150px; width:150px;">
                </div>
                <!--Now the info: Name, Email etc.-->
                <div class="col-sm-8">
                    <div class="row">
                        <div class="col-sm-4">
                            <h5 class="fw-bold text-start">First Name</h5>
                        </div>
                        <div class="col-sm-4 text-start" style="">
                            <p class="lead">John</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <h5 class="fw-bold text-start">Last Name</h5>
                        </div>
                        <div class="col-sm-4 text-start" style="">
                            <p class="lead">Doe</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <h5 class="fw-bold text-start">Email</h5>
                        </div>
                        <div class="col-sm-4 text-start" style="">
                            <p class="lead">johndoe@example.com</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <h5 class="fw-bold text-start">City</h5>
                        </div>
                        <div class="col-sm-4 text-start" style="">
                            <p class="lead">Berlin</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <!--button to edit profile-->
                <div class="col-sm-12"><a class="btn btn-primary float-start" href="#">Edit Profile</a></div>
            </div>
        </div>        
    </div>
</template>
 
<style lang="scss">
.btn-primary{
    background: $primary;
}
</style>