<template>
    <div id="member-area">
        <h1>My area</h1>
        <p>
            Username: {{userInfo.username}}
        </p>
        <p>
            Email: {{userInfo.email}}
        </p>
        <p>
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
                console.log("Rersponse from User Backend: " + response.data)
                this.userInfo.username = response.data.username
                this.userInfo.email = response.data.email
                this.userInfo.city = response.data.city                
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