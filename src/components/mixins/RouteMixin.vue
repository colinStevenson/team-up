<script>
import SiteLoader from '../shared/SiteLoader'
import { mapGetters } from 'vuex'

export default {
  components: {
    SiteLoader
  },
  computed: {
    ...mapGetters([
      'loadingRouteData'
    ]),
    isLoading () {
      return this.loadingRouteData
    }
  }
}
</script>
