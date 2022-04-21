<script>
export default {
  name: 'MockServerComp',
  data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
  props: {
    msg: String
  }
}
</script>