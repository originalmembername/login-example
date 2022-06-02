<template>
    <div id="register" class="container">
        <h1>Register</h1>
        <div class="row"><input type="text" name="username" v-model="input.username" placeholder="Username" /></div>
        <div class="row"><input type="password" name="password" v-model="input.password" placeholder="Password" /></div>
        <div class="row"><input type="password" name="password2" v-model="input.password2"
                placeholder="Repeat Password" /></div>
        <button type="button" v-on:click="register()">Register</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: {
                username: "",
                password: "",
                password2: ""
            }
        }
    },
    methods: {
        async register() {
            console.log("Trying to register new user: " + this.username)
        }
    }
}

</script>

<style scoped>
#register {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
}
button {
    margin: 5px;
}
</style>