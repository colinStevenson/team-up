<template>
  <div class="container-fluid">
    <section class="card">
      <header class="card-header">
        <h2 class="card-title">Register</h2>
      </header>
      <div class="card-body">
        <div class="form-group">
          <label for="register-email">Email address</label>
          <input v-model="email" type="email" class="form-control" id="register-email" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="regster-first-name">First Name</label>
          <input v-model="firstName" type="text" class="form-control" id="register-first-name" placeholder="Enter First Name">
        </div>
        <div class="form-group">
          <label for="regster-last-name">First Name</label>
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
          <small class="form-text text-muted">Why do we need to know about your gender?</small>
        </div>
      </div>
      <div class="card-body">
        <button @click="handleSubmit" class="btn btn-success" type="button">Sign up</button>
      </div>
    </section>
  </div>
</template>
<script>
import Queries from '../queries'
export default {
  name: 'Register',
  props: ['auth'],
  data () {
    return {
      email: null,
      firstName: null,
      lastName: null,
      gender: null
    }
  },
  methods: {
    handleSubmit () {
      this.$apollo.mutate({
        mutation: Queries.CREATE_USER,
        variables: {
          idToken: this.auth.getIdToken(),
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender
        }
      }).then((response) => {
        if (response && response.data && response.data.createUser && response.data.createUser.id) {
          this.$router.push({ name: 'Home' })
        } else {
          // Something went wrong, deal with it
        }
      }).catch((error) => {
        // Error
        console.error(error)
      })
    }
  }
}
</script>
