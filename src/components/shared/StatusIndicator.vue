<template>
  <span v-if="status" class="badge status-indicator" :class="statusClass">
    <span class="sr-only">{{status}}</span>
    <i class="material-icons" v-if="status === 'Yes'">&#xE5CA;</i>
    <i class="material-icons" v-if="status === 'No'">&#xE5CD;</i>
    <span v-if="status === 'Maybe'">?</span>
  </span>
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
<style>
.status-indicator{
  width: 34px;
  height: 34px;
  text-align: center;
}
.status-indicator.badge-secondary span{
  font-size: 24px;
  font-weight: 200;
}
</style>
