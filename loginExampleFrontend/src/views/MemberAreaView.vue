<template>
    <div id="member-area">
        <h1>My area</h1>
        <p v-if="userInfo.firstName">
            First Name: {{userInfo.firstName}}
        </p>
        <p p v-if="userInfo.lastName">
            Last Name: {{userInfo.lastName}}
        </p >
        <p v-if="userInfo.userName">
            Username: {{userInfo.username}}
        </p>
        <p>
            Email: {{userInfo.email}}
        </p>
        <p v-if="userInfo.city">
            City: {{userInfo.city}}
        </p>        
    </div>
</template>

<script>
import authService from '@/services/authService';
    export default {
        name: 'MemberAreaView',
        data() {
            return {
                userInfo: {
                    firstName: "",
                    lastName: "",
                    username: "",
                    email:"",
                    city: ""
                }
            };
        },
        beforeCreate: function() {
            //send token to server, receive user information
            let token = authService.getToken()            
            //normally: if no local token, we shouldn't be allowed to be here by router
            if(!token){
                console.error("There is no local token and we're still in Member view, this shouldn't happen!")
                authService.logout()
                return
            }
            authService.getUserInfo(token).then(response=>{
                //request has been accepted
                //TODO: User data object from response instead of doing this manually
                this.userInfo.username = response.data.username
                this.userInfo.email = response.data.email
                this.userInfo.city = response.data.city   
                this.userInfo.firstName = response.data.first_name
                this.userInfo.lastName = response.data.last_name             
            }).catch(error=>{
                //request has been rejected, trigger logout
                console.log(error)
                authService.logout()
            })
        }
    }
</script>

<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>