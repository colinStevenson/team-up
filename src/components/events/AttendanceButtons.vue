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
      event: 'event',
      currentAttendance: 'currentAttendance'
    }),
    attendanceStatus () {
      const attendance = this.currentAttendance
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
    console.log('Attendances.vue mounted this.eventId: ' + this.eventId)
    this.$store.dispatch('getEvent', this.eventId)
    this.$store.dispatch('getCurrentAttendance', {eventId: this.eventId, userId: this.user.id})
  }
}
</script>