<template>
    <div>
        <h1>User {{ user }} successfully registered</h1>
        <button type="button" v-on:click="$router.push('/login')">OK</button>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: String,
            required: true
        }
    }

}
</script>