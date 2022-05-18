<script>
export default {
    name: "AuthComp",
    data() {
        return {
            isAuthenticated: false
        }
    },
    computed: {
        authStatus: {
            set: function (value) {
                this.isAuthenticated = value
            },
            get: function () {
                return this.isAuthenticated
            },
        },

    }
}
</script>