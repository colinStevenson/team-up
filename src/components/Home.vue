<template>
  <div>
    <div class="page-header mb-0">
      <div class="container">
        <h1>Welcome to TeamApp*</h1>
      </div>
    </div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <p>Making the world a better place through enhanced team scheduling.</p>
        <hr class="my-4" />
        <p>To join your team, get started by signing up.</p>
        <button
            type="button"
            class="btn btn-primary btn-lg"
            @click="register()">
              Sign up
          </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    register () {
      this.$router.push('register')
    }
  }
}
</script>

