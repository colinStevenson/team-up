<template>
  <span class="avatar" :title="name">
    {{initials}}
  </span>
</template>
<script>
export default {
  props: ['user'],
  computed: {
    initials () {
      const first = String(this.user.firstName)[0]
      const last = String(this.user.lastName)[0]
      return `${first}${last}`
    },
    name () {
      return `${this.user.firstName} ${this.user.lastName}`
    }
  }
}
</script>

