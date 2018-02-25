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
    <input 
      class="maybe"
      :disabled="isLoading"
      type="radio"
      :name="inputName"
      :id="`${eventId}-maybe`"
      value="Maybe"
      v-model="status">
    <label :for="`${eventId}-maybe`">Maybe</label>
    <input 
      class="no"
      :disabled="isLoading"
      type="radio"
      :name="inputName"
      :id="`${eventId}-no`"
      value="No"
      v-model="status">
    <label :for="`${eventId}-no`">No</label>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AttendanceButtons',
  props: {
    eventId: {
      required: true
    },
    teamId: {
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'attendancesByEventId',
      'loadingAttendancesByEventId'
    ]),
    attendance () {
      let val = null
      if (this.attendancesByEventId && this.attendancesByEventId[this.eventId]) {
        val = this.attendancesByEventId[this.eventId]
      }
      return val
    },
    inputName () {
      return `${this.eventId}-control`
    },
    isLoading () {
      return this.loadingAttendancesByEventId[this.eventId] === true
    }
  },
  data () {
    return {
      status: null,
      noWatchStatus: false
    }
  },
  methods: {
    ...mapActions([
      'recordAttendance',
      'updateAttendance',
      'getAttendancesByEventId'
    ]),
    saveStatus (status) {
      if (this.attendance && this.attendance.id) {
        this.updateAttendance({
          attendanceId: this.attendance.id,
          eventId: this.eventId,
          userId: this.user.id,
          status: status
        })
      } else {
        this.recordAttendance({
          eventId: this.eventId,
          userId: this.user.id,
          teamId: this.teamId,
          status: status
        })
      }
    }
  },
  mounted () {
    this.getAttendancesByEventId({eventId: this.eventId, userId: this.user.id})
  },
  watch: {
    status (newVal, oldVal) {
      if (oldVal !== newVal && !this.noWatchStatus) {
        this.saveStatus(this.status)
      }
    },
    attendancesByEventId () {
      if (this.attendance) {
        this.noWatchStatus = true
        this.status = this.attendance.status
        this.$nextTick(() => {
          this.noWatchStatus = false
        })
      }
    }
  }
}
</script>