<template>
  <div>
    <div class="page-header">
      <div class="container">
        <h1>Register</h1>
      </div>
    </div>
    <div class="container">
      <section class="card">
        <div class="card-body">
          <div class="form-group">
            <label for="register-email">Email address</label>
            <div v-if="authEmail">{{authEmail}}</div>
            <input v-else v-model="email" type="email" class="form-control" id="register-email" aria-describedby="emailHelp" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="regster-first-name">First Name</label>
            <input v-model="firstName" type="text" class="form-control" id="register-first-name" placeholder="Enter First Name">
          </div>
          <div class="form-group">
            <label for="regster-last-name">Last Name</label>
            <input v-model="lastName" type="text" class="form-control" id="register-last-name" placeholder="Enter Last Name">
          </div>
          <div>
            <div class="mb-2">Gender</div>
            <div class="form-check">
              <label class="form-check-label">
                <input v-model="gender" class="form-check-input" type="radio" name="register-gender" id="register-gender-f" value="Female" checked>
                Female
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input v-model="gender" class="form-check-input" type="radio" name="register-gender" id="register-gender-m" value="Male">
                Male
              </label>
            </div>
            <small class="form-text text-muted">If you are on a coed team, we will show attendance by gender.</small>
          </div>
        </div>
        <div class="card-body">
          <button @click="handleSubmit" class="btn btn-primary" type="button">Sign up</button>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import auth from '../auth/AuthService.js'
export default {
  name: 'Register',
  props: ['auth'],
  computed: {
    authEmail () {
      const profile = auth.getProfile()
      return profile ? profile.email : this.email
    }
  },
  data () {
    return {
      email: null,
      firstName: null,
      lastName: null,
      gender: null
    }
  },
  methods: {
    ...mapActions({
      createUser: 'createUser'
    }),
    handleSubmit () {
      this.createUser({
        idToken: this.auth.getIdToken(),
        email: this.authEmail,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        callback: this.handleUserCreation
      })
    },
    handleUserCreation () {
      this.$router.push({ name: 'Teams' })
    }
  },
  mounted () {
    if (!this.auth.getIdToken()) {
      this.auth.login()
    }
  }
}
</script>
