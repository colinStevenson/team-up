<template>
  <nav class="navbar navbar-light navbar-primary bg-info">
      <div class="container">
        <router-link :to="'/'" class="navbar-brand">
          <logo></logo>
          {{appName}}
        </router-link>  
        <div v-if="authenticated && user">
          <avatar :user="user" class="mr-1"></avatar>
          <button
            type="button"
            class="btn btn-link btn-sm text-danger"
            title="Logout"
            v-if="authenticated"
            @click="logout()">
              <span class="sr-only">Logout</span>
              <i class="material-icons">&#xE898;</i>
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
            class="btn btn-link btn-sm text-danger"
            title="Logout"
            v-if="authenticated"
            @click="logout()">
              <span class="sr-only">Logout</span>
              <i class="material-icons">&#xE898;</i>
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
import Logo from '../assets/logo.svg'
const { login, logout } = auth
export default {
  props: ['authenticated'],
  components: {
    Avatar,
    Logo
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
