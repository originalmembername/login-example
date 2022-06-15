<template>
    <div id="member-area">
        <h1>Secure Area</h1>
        <p>
            Welcome user {{userInfo.username}}
        </p>
        <p v-if="userInfo.city">from {{userInfo.city}}</p>
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
                console.log(response)
                let username = response.data.username
                let city = response.data.city
                this.userInfo.username = username
                if(city){
                    this.userInfo.city = city
                }
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