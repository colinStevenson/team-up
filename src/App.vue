<template>
  <div id="app">
    <site-header :authenticated="authenticated"></site-header>
    <main class="main" v-if="loadingUserData">
      <site-loader></site-loader>
    </main>
    <main class="main" v-else>
      <router-view
        :auth="auth"
        :authenticated="authenticated">
      </router-view>
    </main>
  </div>
</template>

<script>
import auth from './auth/AuthService'
import SiteHeader from './components/SiteHeader'
import SiteLoader from './components/shared/SiteLoader'
import { mapGetters, mapActions } from 'vuex'
const { authenticated, authNotifier } = auth

export default {
  name: 'app',
  created () {
    this.handleRedirect()
    this.getUser()
    auth.authNotifier.on('authChange', (authStatus) => {
      this.getUser()
    })
  },
  components: {
    SiteHeader,
    SiteLoader
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
  },
  methods: {
    ...mapActions([
      'getUser'
    ]),
    handleRedirect () {
      if (this.$route.query && this.$route.query.redirect && this.authenticated) {
        this.$router.replace(this.$route.query.redirect)
      }
    }
  }
}
</script>
<style lang='scss'>
@import './style/app.scss';
</style>
