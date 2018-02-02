<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isRegisteredUser: 'isRegisteredUser'
    })
  },
  created () {
    if (!this.isRegisteredUser) {
      this.$router.replace({name: 'Register'})
    }
  }
}
</script>
