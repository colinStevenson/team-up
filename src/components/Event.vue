<template>
  <div>
    <div class="page-header">
      <div class="container-fluid">
        <h1>{{event.team.name}}</h1>
      </div>
    </div>
    <div class="container-fluid" v-if="event">
      <section class="card">
        <div class="card-header">
          {{event.name}}
        </div>
        <div class="card-body">
          <h5 class="card-title">
            Time: {{$moment(event.time).format('MMM Do [at] hh:mma')}}
          </h5>
          <h5 class="card-title">
            Location: {{event.location}}
          </h5>
        </div>
        <div class="card-body">
          <div class="h5">Are you in?</div>
          <button class="btn btn-success btn-lg" :class="{ disabled: attendanceStatus == 'Yes'}" @click="updateEventStatus('Yes')">YES</button>
          <button class="btn btn-warning btn-lg" :class="{ disabled: attendanceStatus == 'Maybe'}" @click="updateEventStatus('Maybe')">MAYBE</button>
          <button class="btn btn-danger btn-lg" :class="{ disabled: attendanceStatus == 'No'}" @click="updateEventStatus('No')">NO</button>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Event',
  props: ['id'],
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
      getEvent: 'getEvent',
      getCurrentAttendance: 'getCurrentAttendance',
      recordAttendance: 'recordAttendance'
    }),
    updateEventStatus (status) {
      this.recordAttendance({
        eventId: this.id,
        userId: this.user.id,
        status: status
      })
    }
  },
  mounted () {
    this.getEvent(this.id)
    this.getCurrentAttendance({eventId: this.id, userId: this.user.id})
  }
}
</script>
