<template>
  <div class="attendance-control">
    <input 
      class="yes"
      :disabled="isLoading"
      type="radio" 
      :name="inputName" 
      :id="`${eventId}-yes`" 
      value="Yes" 
      v-model="status">
    <label :for="`${eventId}-yes`">Yes</label>
    <input class="maybe" type="radio" :name="inputName" :id="`${eventId}-maybe`" value="Maybe" v-model="status">
    <label :for="`${eventId}-maybe`">Maybe</label>
    <input class="no" type="radio" :name="inputName" :id="`${eventId}-no`" value="No" v-model="status">
    <label :for="`${eventId}-no`">No</label>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AttendanceButtons',
  props: ['eventId'],
  computed: {
    ...mapGetters({
      user: 'user',
      attendancesByEventId: 'attendancesByEventId'
    }),
    inputName () {
      return `${this.eventId}-control`
    }
  },
  data () {
    return {
      isLoading: true,
      status: null
    }
  },
  methods: {
    ...mapActions({
      recordAttendance: 'recordAttendance'
    }),
    updateEventStatus (status) {
      this.recordAttendance({
        eventId: this.eventId,
        userId: this.user.id,
        status: status
      })
    }
  },
  mounted () {
    this.$store.dispatch('getAttendancesByEventId', {eventId: this.eventId, userId: this.user.id})
  },
  watch: {
    status (newVal, oldVal) {
      if (oldVal !== newVal) {
        this.updateEventStatus(this.status)
      }
    },
    attendancesByEventId () {
      const attendance = this.attendancesByEventId[this.eventId]
      if (attendance && attendance.status) {
        this.status = attendance.status
      }
      this.isLoading = false
    }
  }
}
</script>