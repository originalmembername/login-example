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
            axios.get('http://127.0.0.1:8000/auth/login/')
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}

</script>