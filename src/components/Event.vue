<template>
  <div v-if="hasSufficientData">
    <div class="page-header">
      <div class="container">
        <h1>
          {{event.team.name}}
        </h1>
      </div>
    </div>
    <div class="container">
        <section class="card">
          <div class="card-header d-flex justify-content-between">
            <h2 class="h3 card-title">
              {{event.name}}
              <small></small>
            </h2>
            <attendance-buttons :event-id="id"></attendance-buttons>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <table class="table table-nv">
                  <caption class="sr-only">Event details</caption>
                  <tbody>
                    <tr>
                      <th scope="row">When</th>
                      <td>{{ $moment(event.time).format('MMM Do h:mma') }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Where</th>
                      <td>{{ event.location || '--' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">What</th>
                      <td>{{ event.description || '--' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-8 d-flex justify-content-between">
                <ul class="list-group">
                  <li class="list-group-item list-group-item-success">
                    <h3 class="h5 mb-0">In</h3>
                  </li>
                </ul>
                <ul class="list-group">
                  <li class="list-group-item list-group-item-danger">
                    <h3 class="h5 mb-0">Out</h3>
                  </li>
                </ul>
                <ul class="list-group">
                  <li class="list-group-item list-group-item-primary">
                    <h3 class="h5 mb-0">Maybe</h3>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
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
    ...mapGetters([
      'user',
      'event',
      'attendancesByEventId',
      'team'
    ]),
    attendanceStatus () {
      const attendance = this.attendancesByEventId[this.id]
      return attendance ? attendance.status : null
    },
    hasSufficientData () {
      return !!this.event
    }
  },
  mounted () {
    this.$store.dispatch('getTeam', this.id)
    this.$store.dispatch('getEvent', this.id)
    this.$store.dispatch('getAttendancesByEventId', {eventId: this.id, userId: this.user.id})
  }
}
</script>
