<template>
  <div id="app">
    <nav class="navbar navbar-light bg-info mb-3">
      <header class="navbar-header">
        <div class="d-inline-flex">
          <router-link :to="'/'" class="navbar-brand">TeamUp</router-link>  
        </div>
        <div class="d-inline-flex">
          <button
            type="button"
            class="btn btn-success btn-sm"
            v-if="!authenticated"
            @click="login()">
              Log In
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
    <main v-if="loading">
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
  },
  components: {
    SiteLoader
  },
  computed: {
    ...mapGetters({
      user: 'user',
      isRegisteredUser: 'isRegisteredUser'
    }),
    isRegistered () {
      return !!this.user
    }
  },
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated,
      registered: false,
      loading: true
    }
  },
  methods: {
    login,
    logout
  },
  watch: {
    isRegisteredUser () {
      this.loading = false
      if (this.isRegisteredUser === false) {
        // this.$router.replace('/Register')
      }
    }
  }
}
</script>
<style>
@import 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css';
</style>
