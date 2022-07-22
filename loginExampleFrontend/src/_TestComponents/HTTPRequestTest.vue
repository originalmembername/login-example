<template>
    <div>
        <button class="btn btn-primary" type="submit" v-on:click="httpTest()">HTTPTest</button>
    </div>
</template>

<script>
import axios from 'axios'
import authService from '@/services/authService'

export default {
    name: "HTTPRequestTest",
    methods: {
        async httpTest() {

            let url = authService.BACKEND_URL + "user/create/"
            console.log("Sending token auth request to " + url)
            axios.post(url, {
              //  params: {
                    username: 'newuser1',
                    email: 'newuser1@web.de',
                    city: 'Halle',
                    password: 'krepppap1er',
              //  }
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}

</script>