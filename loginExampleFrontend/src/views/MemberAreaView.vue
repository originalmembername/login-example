<template>
    <div id="member-area">
        <h1>My area</h1>
        <p v-if="userInfo.first_name">
            First Name: {{userInfo.first_name}}
        </p>
        <p p v-if="userInfo.last_name">
            Last Name: {{userInfo.last_name}}
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
                    //gets filled with data from server
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
                this.userInfo = response.data
                console.dir((this.userInfo))         
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