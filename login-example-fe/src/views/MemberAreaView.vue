<template>
    <div id="member-area">
        <h1>Secure Area</h1>
        <p>
            This is a secure area, where some secret information will be displayed
        </p>
    </div>
</template>

<script>
    export default {
        name: 'MemberAreaView',
        data() {
            return {};
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