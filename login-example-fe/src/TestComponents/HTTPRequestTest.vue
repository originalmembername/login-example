<template>
    <div>
        <button class="btn btn-primary" type="submit" v-on:click="httpTest()">HTTPTest</button>
    </div>
</template>

<script>
import axios from 'axios'
//import authService from '@/services/authService'
export default {
    name: "HTTPRequestTest",
    methods: {
        async httpTest() {
            //            let token = authService.getToken()
            let token = "0b4d9d3610eca0037e50c1d3b9caa629b48be984"
            if (!token) {
                console.log("No local token")
                return
            }
            console.log("Local Token: " + token);
            axios.defaults.headers.common['Authorization'] = `Token ${token}`
            
            let json = require('../../networkconfig.json')
            let url = json.BACKEND_URL + "user/"
            console.log("Sending token auth request to " + url)
            axios.get(url, {
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}

</script>