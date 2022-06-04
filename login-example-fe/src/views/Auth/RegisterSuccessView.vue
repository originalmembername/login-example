<template>
    <div>
        <h1>User {{ user }} successfully registered</h1>
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