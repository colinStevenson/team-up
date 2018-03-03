<template>
  <div id="app">
    <site-header :authenticated="authenticated"></site-header>
    <main v-if="loadingUserData">
      <site-loader></site-loader>
    </main>
    <main v-else>
      <router-view
        :auth="auth"
        :authenticated="authenticated">
      </router-view>
    </main>
  </div>
</template>

<script>
import auth from './auth/AuthService'
import SiteLoader from './components/shared/SiteLoader'
import SiteHeader from './components/SiteHeader'
import { mapGetters } from 'vuex'
const { authenticated, authNotifier } = auth

export default {
  name: 'app',
  created () {
    this.$store.dispatch('getUser')
    auth.authNotifier.on('authChange', (authStatus) => {
      this.$store.dispatch('getUser')
    })
  },
  components: {
    SiteLoader,
    SiteHeader
  },
  computed: {
    ...mapGetters([
      'user',
      'isRegisteredUser',
      'loadingUserData'
    ])
  },
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated
    }
  }
}
</script>
<style lang='scss'>
@import './style/app.scss';
</style>
