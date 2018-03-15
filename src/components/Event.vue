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
        <div class="mb-3">
          <router-link :to="`/team/${event.team.id}`">
            <i class="material-icons md-16">&#xE5C4;</i>Back to Games
          </router-link>
        </div>
        <section class="card">
          <div class="card-header d-flex justify-content-between">
            <h2 class="h3 card-title">
              {{event.name}}
            </h2>
            <attendance-buttons :event-id="id" :team-id="event.team.id"></attendance-buttons>
          </div>
          <div class="card-body">
            <h3 class="h4">
              <strong class="pr-2">{{ $moment(event.time).format('MMM Do h:mma') }}</strong>
              {{event.location}}
            </h3>
            <attendance-count v-if="teamAttendance" :men="menIn.length" :women="womenIn.length" :isCoed="isCoedTeam"></attendance-count>
              <ul class="list-group mb-3" v-if="!!teamAttendance">
                <li class="list-group-item d-flex justify-content-between" v-for="member in membersWithAttendance">
                  <span>{{member.firstName}} {{member.lastName}}</span>
                  <status-indicator :status="member.attendance.status"></status-indicator>
                </li>
              </ul>
          </div>
        </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AttendanceButtons from './events/AttendanceButtons'
import StatusIndicator from './shared/StatusIndicator'
import AttendanceCount from './shared/AttendanceCount'

export default {
  name: 'Event',
  props: {
    id: {
      required: true
    }
  },
  components: {
    AttendanceButtons,
    AttendanceCount,
    StatusIndicator
  },
  computed: {
    ...mapGetters([
      'user',
      'event',
      'attendancesByEventId',
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
    menIn () {
      return this.playersIn.filter(attendance => {
        return attendance.user.gender === 'Male'
      })
    },
    womenIn () {
      return this.playersIn.filter(attendance => {
        return attendance.user.gender === 'Female'
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
    },
    attendancesByUserId () {
      const value = {}
      this.teamAttendance.forEach(attendance => {
        const userId = attendance.user.id
        value[userId] = attendance
      })
      return value
    },
    membersWithAttendance () {
      const value = []
      const members = this.event && this.event.team && this.event.team.users ? this.event.team.users : []
      members.forEach(member => {
        value.push(Object.assign({}, member, {attendance: this.attendancesByUserId[member.id] || {}}))
      })
      return value
    },
    isCoedTeam () {
      let value = false
      const members = this.event && this.event.team && this.event.team.users ? this.event.team.users : []
      if (members.length > 1) {
        const gender = members[0].gender
        for (let i = 1; i < members.length; i++) {
          if (members[i].gender !== gender) {
            value = true
            break
          }
        }
      }
      return value
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
