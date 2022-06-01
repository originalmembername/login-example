<template>
    <div id="register">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <input type="password" name="password2" v-model="input.password2" placeholder="Repeat Password" />
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
        async register () {
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
</style>