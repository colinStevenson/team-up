<template>
  <div class="container-fluid" v-if="event">
    <h3>{{ event.team.name }}</h3>
    <div class="row">
      <div class="col-sm-6">
        <section class="card">
          <div class="card-header">
            <section>
              {{ event.name }}
              <button v-if="attendanceStatus == 'Yes'" class="btn btn-success btn-sm float-right role='button' aria-pressed='true'">I'll be there!</button>
              <button v-if="attendanceStatus == 'Maybe'" class="btn btn-warning btn-sm float-right role='button' aria-pressed='true'">I'm not sure</button>
              <button v-if="attendanceStatus == 'No'" class="btn btn-danger btn-sm float-right role='button' aria-pressed='true'">I can't make it</button>
            </section>
          </div>
          <div class="card-body h3">
            <dl class="row">
              <dt class="col-sm-5">Date</dt>
              <dd class="col-sm-7">{{ $moment(event.time).format('MMM Do') }}</dd>

              <dt class="col-sm-5">Time</dt>
              <dd class="col-sm-7">{{ $moment(event.time).format('h:mma') }}</dd>

              <dt class="col-sm-5">Location</dt>
              <dd class="col-sm-7">{{ event.location || "Pleasant View" }}</dd>

              <dt class="col-sm-5">My Status</dt>
              <dd class="col-sm-7"><attendance-buttons :event-id="id"></attendance-buttons></dd>

              <dt class="col-sm-5">More Info</dt>
              <dd class="col-sm-7"></dd>
            </dl>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AttendanceButtons from './events/AttendanceButtons'

export default {
  name: 'Event',
  props: ['id'],
  components: {
    AttendanceButtons
  },
  computed: {
    ...mapGetters({
      user: 'user',
      event: 'event',
      currentAttendance: 'currentAttendance'
    }),
    attendanceStatus () {
      console.log('computing currentAttendance: ' + this.currentAttendance.status)
      const attendance = this.currentAttendance
      return attendance ? attendance.status : null
    }
  },
  mounted () {
    this.$store.dispatch('getEvent', this.id)
    this.$store.dispatch('getCurrentAttendance', {eventId: this.id, userId: this.user.id})
  }
}
</script>
