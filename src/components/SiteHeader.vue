<template>
  <nav class="navbar navbar-light navbar-primary bg-info">
      <div class="container">
        <router-link :to="'/'" class="navbar-brand">{{appName}}</router-link>  
        <div v-if="authenticated && user">
          <span class="p-2">{{user.firstName}} {{user.lastName}}</span>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            v-if="authenticated"
            @click="logout()">
              Log Out
          </button>
        </div>
        <div v-else>
          <button
            type="button"
            class="btn btn-info btn-sm"
            v-if="!authenticated"
            @click="login()">
              Log In
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm ml-2"
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
      </div>
    </nav>
</template>
<script>
import auth from '../auth/AuthService'
import { mapGetters } from 'vuex'
import constants from '../shared/constants'
const { login, logout } = auth
export default {
  props: ['authenticated'],
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  data () {
    return {
      appName: constants.APP_NAME
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
