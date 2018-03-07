<template>
  <nav class="navbar navbar-light navbar-primary bg-info">
      <div class="container">
        <router-link :to="'/'" class="navbar-brand">
          <img src="../assets/logo.svg" alt="Logo">
          {{appName}}
        </router-link>  
        <div v-if="authenticated && user">
          <avatar :user="user" class="mr-2"></avatar>
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
import Avatar from './shared/Avatar'
const { login, logout } = auth
export default {
  props: ['authenticated'],
  components: {
    Avatar
  },
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
