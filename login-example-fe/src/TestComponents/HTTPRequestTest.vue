<template>
    <div>
        <button class="btn btn-primary" type="submit" v-on:click="httpTest()">HTTPTest</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "HTTPRequestTest",
    methods: {
        async httpTest() {
            console.log("HTTP-Test")
            axios.post("http://127.0.0.1:8000/auth/login/", 
            {
                username: 'testuser',
                password: 'de1nemudder'
            })
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}

</script>