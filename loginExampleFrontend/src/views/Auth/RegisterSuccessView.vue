<template>
    <div>
        <h1>User with email {{ email }} successfully registered</h1>
        <button type="button" v-on:click="$router.push('/login')">OK</button>
    </div>
</template>

<script>
export default {
    props: {
        email: {
            type: String,
            required: true
        }
    }

}
</script>