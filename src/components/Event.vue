<template>
  <div v-if="event">
    <div class="page-header">
      <div class="container-fluid">
        <h1>
          {{event.name}}
        </h1>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <section class="card">
            <div class="card-header">
              <section>
                <span v-if="attendanceStatus == 'Yes'" class="badge badge-success">I'll be there!</span>
                <span v-if="attendanceStatus == 'Maybe'" class="badge badge-secondary">I'm not sure if i can make it...</span>
                <span v-if="attendanceStatus == 'No'" class="badge badge-danger">Sorry, I can't make it!</span>
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
                <dd class="col-sm-7"><attendance-buttons :event-id="id" :team-id="event.team.id"></attendance-buttons></dd>

                <dt class="col-sm-5">Description</dt>
                <dd class="col-sm-7">{{ event.description }}</dd>
              </dl>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AttendanceButtons from './events/AttendanceButtons'

export default {
  name: 'Event',
  props: {
    id: {
      required: true
    }
  },
  components: {
    AttendanceButtons
  },
  computed: {
    ...mapGetters({
      user: 'user',
      event: 'event',
      attendancesByEventId: 'attendancesByEventId'
    }),
    attendanceStatus () {
      const attendance = this.attendancesByEventId[this.id]
      return attendance ? attendance.status : null
    }
  },
  methods: {
    ...mapActions([
      'getEvent',
      'getAttendancesByEventId'
    ])
  },
  mounted () {
    this.getEvent(this.id)
    this.getAttendancesByEventId({eventId: this.id, userId: this.user.id})
  }
}
</script>
