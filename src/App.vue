<template>
  <div id="app">
    <nav class="navbar navbar-light bg-info mb-3">
      <header class="navbar-header">
        <div class="d-inline-flex">
          <router-link :to="'/'" class="navbar-brand">EasyTeam</router-link>  
        </div>
        <div class="d-inline-flex">
          <button
            type="button"
            class="btn btn-primary btn-sm"
            v-if="!authenticated"
            @click="login()">
              Log In
          </button>
          <button
            type="button"
            class="btn btn-success btn-sm ml-2"
            v-if="!authenticated"
            @click="register()">
              Sign up
          </button>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            v-if="authenticated"
            @click="logout()">
              Log Out
          </button>
        </div>
      </header>
    </nav>
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
import SiteLoader from './components/shared/SiteLoader.vue'
import { mapGetters } from 'vuex'

const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'app',
  created () {
    this.$store.dispatch('getUser')
    auth.authNotifier.on('authChange', (authStatus) => {
      this.$store.dispatch('getUser')
    })
  },
  components: {
    SiteLoader
  },
  computed: {
    ...mapGetters({
      user: 'user',
      isRegisteredUser: 'isRegisteredUser',
      loadingUserData: 'loadingUserData'
    })
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
    login,
    logout,
    register () {
      this.$router.push('register')
    }
  }
}
</script>
<style lang='scss'>
@import './style/app.scss';
</style>
