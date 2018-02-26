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
            <attendance-buttons :event-id="id" :team-id="event.team.id"></attendance-buttons>
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
              <div class="col-md-8" v-if="!!teamAttendance">
                <ul class="list-group mb-3">
                  <li class="list-group-item">
                    <strong>In </strong>
                    <span>({{playersIn.length}})</span>
                  </li>
                  <li class="list-group-item" v-for="player in playersIn">{{player.user.firstName}} {{player.user.lastName}}</li>
                </ul>
                <ul class="list-group mb-3">
                  <li class="list-group-item">
                    <strong>Out</strong>
                    <span>({{playersOut.length}})</span>
                  </li>
                  <li class="list-group-item" v-for="player in playersOut">{{player.user.firstName}} {{player.user.lastName}}</li>
                </ul>
                <ul class="list-group mb-3">
                  <li class="list-group-item">
                    <strong>Maybe</strong>
                    <span>({{playersMaybe.length}})</span>
                  </li>
                  <li class="list-group-item" v-for="player in playersMaybe">{{player.user.firstName}} {{player.user.lastName}}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
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
    ...mapGetters([
      'user',
      'event',
      'attendancesByEventId',
      'team',
      'teamAttendanceByEvent'
    ]),
    attendanceStatus () {
      const attendance = this.attendancesByEventId[this.id]
      return attendance ? attendance.status : null
    },
    hasSufficientData () {
      return !!this.event
    },
    teamAttendance () {
      return this.teamAttendanceByEvent ? this.teamAttendanceByEvent[this.id] : []
    },
    playersIn () {
      return this.teamAttendance.filter(attendance => {
        return attendance.status === 'Yes'
      })
    },
    playersOut () {
      return this.teamAttendance.filter(attendance => {
        return attendance.status === 'No'
      })
    },
    playersMaybe () {
      return this.teamAttendance.filter(attendance => {
        return attendance.status === 'Maybe'
      })
    }
  },
  methods: {
    ...mapActions([
      'getEvent',
      'getAttendancesByEventId',
      'getTeamAttendanceByEvent'
    ])
  },
  mounted () {
    this.getEvent(this.id)
    this.getTeamAttendanceByEvent({eventId: this.id})
    this.getAttendancesByEventId({eventId: this.id, userId: this.user.id})
  }
}
</script>
