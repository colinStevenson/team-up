<template>
  <div class="spinner">
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