<template>
  <div>
    <section class="card mb-3" :class="{'is-loading': isLoadingEvents}">
      <div class="card-header">
        <h3 class="card-title">Upcoming Games</h3>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between" v-for="event in upcomingEvents">
          <router-link :to="`/event/${event.id}`">{{event.name}}</router-link>
          <div>
            <strong>{{ $moment(event.time).format('MMM Do') }}</strong>
              {{ $moment(event.time).format('h:mma') }}
          </div>
          <attendance-buttons :event-id="event.id" :team-id="teamId" :attendance="getUserAttendanceFromAttendances(event.attendances)"></attendance-buttons>
        </li>
      </ul>
      <div class="card-body" v-if="isAdmin">
        <button class="btn btn-outline-primary card-link" @click="toggleEditing" v-if="!isEditing">Add Event</button>
        <div class="mt-3" v-if="isEditing">
          <div class="form-group">
            <label for="event-name">Event Name</label>
            <input type="text" class="form-control" id="event-name" placeholder="Enter event name" v-model="eventName">
          </div>
          <div class="form-group">
            <label for="event-location">Location</label>
            <input type="text" class="form-control" id="event-location" placeholder="Enter location" v-model="eventLocation">
          </div>
          <div class="form-group">
            <label for="event-date">Date/ Time</label>
            <input class="form-control" type="datetime-local" id="event-date" v-model="eventDate">
          </div>
          <button class="btn btn-primary mr-sm-3" type="button" @click="saveEvent">Save</button>
          <button class="btn btn-danger" type="button" @click="toggleEditing">Cancel</button>
        </div>
      </div>
    </section>
    <section class="card mb-3"  :class="{'is-loading': isLoadingEvents}" v-if="showPastEvents && pastEvents.length">
      <div class="card-header">
        <h3 class="card-title">Past Games</h3>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between" v-for="event in pastEvents">
          <router-link :to="`/event/${event.id}`">{{event.name}}</router-link>
          <div>
            <strong>{{ $moment(event.time).format('MMM Do') }}</strong>
              {{ $moment(event.time).format('h:mma') }}
          </div>
          <attendance-buttons :event-id="event.id" :team-id="teamId" :attendance="getUserAttendanceFromAttendances(event.attendances)"></attendance-buttons>
        </li>
      </ul>
    </section>
    <button class="btn btn-link pl-0" @click="showPastEvents = !showPastEvents">
      {{showPastEvents ? 'Hide past games' : 'Show past games'}}
    </button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AttendanceButtons from './../shared/AttendanceButtons'
import Moment from 'moment'

export default {
  components: {
    AttendanceButtons
  },
  computed: {
    ...mapGetters([
      'user',
      'teamEvents',
      'isAdmin'
    ]),
    startOfDay () {
      const val = new Date()
      val.setHours(0)
      val.setMinutes(0)
      val.setSeconds(0)
      return val
    },
    upcomingEvents () {
      let val = this.teamEvents || []
      return val.filter(event => {
        const eventDate = Moment(event.time)
        return eventDate.isAfter(this.startOfDay)
      })
    },
    pastEvents () {
      let val = this.teamEvents || []
      return val.filter(event => {
        const eventDate = Moment(event.time)
        return eventDate.isBefore(this.startOfDay)
      })
    }
  },
  data () {
    return {
      isEditing: false,
      eventName: null,
      eventDate: null,
      eventLocation: null,
      showPastEvents: false,
      isLoadingEvents: false
    }
  },
  methods: {
    ...mapActions([
      'createTeamEvent',
      'getTeamEvents'
    ]),
    getUserAttendanceFromAttendances (attendances) {
      let value = null
      for (let i = 0; i < attendances.length; i++) {
        if (attendances[i].user.id === this.user.id) {
          value = attendances[i]
          break
        }
      }
      return value
    },
    toggleEditing () {
      this.isEditing = !this.isEditing
    },
    saveEvent () {
      this.createTeamEvent({
        teamId: this.teamId,
        name: this.eventName,
        location: this.eventLocation,
        eventDate: new Moment(this.eventDate).local().toDate()
      }).then(() => {
        this.requestEvents(true)
      })
    },
    requestEvents (forceNetwork) {
      this.isLoadingEvents = true
      this.getTeamEvents({teamId: this.teamId, forceNetwork}).then(() => {
        this.isLoadingEvents = false
      })
    }
  },
  props: ['teamId']
}
</script>


