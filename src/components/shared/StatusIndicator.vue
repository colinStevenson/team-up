<template>
  <span v-if="status" class="badge" :class="statusClass">{{status}}</span>
  <em class="text-muted" v-else>Response Needed</em>
</template>
<script>
const CLASS_NAME_BY_STATUS = {
  Yes: 'badge-success',
  No: 'badge-danger',
  Maybe: 'badge-secondary'
}
const DEFAULT_STATUS_CLASS = 'badge-light'
export default {
  props: ['status'],
  computed: {
    statusClass () {
      return CLASS_NAME_BY_STATUS[this.status] || DEFAULT_STATUS_CLASS
    }
  }
}
</script>
