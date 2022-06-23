<template>
    <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProfileModal">
            Edit Profile
        </button>

        <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <EditProfileModalContent v-if="!changePasswordView" @show-change-password-view="showChangePasswordView"/>
                <ChangePasswordModalContent v-if="changePasswordView" @show-change-password-view="showChangePasswordView"/>
            </div>
        </div>
    </div>
</template>

<script>
import "bootstrap/dist/js/bootstrap.min.js";
import EditProfileModalContent from "./EditProfileModalContent.vue";
import ChangePasswordModalContent from "./ChangePasswordModalContent.vue"

export default {
    name: "EditProfileModal",
    components: { EditProfileModalContent, ChangePasswordModalContent },
    data() {
        return {
            changePasswordView: false
        }
    },
    methods: {
        showChangePasswordView(value){
            console.log("Showing Chage Password View: " + value)
            this.changePasswordView = value
        }
    }
}
</script>
