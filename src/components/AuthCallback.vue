<template>
  <div class="container">
    Authenticating...
  </div>
</template>

<script>
export default {
  name: 'callback',
  props: ['auth'],
  created () {
    this.auth.handleAuthentication()
  }
}
</script>