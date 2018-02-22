<template>
  <section>
    <button class="btn btn-outline-success" :class="{ 'active': attendanceStatus == 'Yes'}" @click="updateEventStatus('Yes')">YES</button>
    <button class="btn btn-outline-warning" :class="{ 'active': attendanceStatus == 'Maybe'}" @click="updateEventStatus('Maybe')">MAYBE</button>
    <button class="btn btn-outline-danger" :class="{ 'active': attendanceStatus == 'No'}" @click="updateEventStatus('No')">NO</button>
  </section>
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
    attendanceStatus () {
      const attendance = this.attendancesByEventId[this.eventId]
      return attendance ? attendance.status : null
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
  }
}
</script>