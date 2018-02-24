<template>
  <section class="card">
    <div class="card-header">
      <h3 class="card-title">Games</h3>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item d-flex justify-content-between" v-for="event in teamEvents">
        <router-link :to="`/event/${event.id}`">{{event.name}}</router-link>
        <div>
          <strong>{{ $moment(event.time).format('MMM Do') }}</strong>
            {{ $moment(event.time).format('h:mma') }}
        </div>
        <attendance-buttons :event-id="event.id"></attendance-buttons>
      </li>
    </ul>
    <div class="card-body">
      <button class="btn btn-outline-primary card-link" @click="toggleEditing" v-if="!isEditing">Add Event</button>
      <div class="mt-3" v-if="isEditing">
        <div class="form-group">
          <label for="event-name">Event Name</label>
          <input type="text" class="form-control" id="event-name" placeholder="Enter event name" v-model="eventName">
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
</template>
<script>
import { mapGetters } from 'vuex'
import AttendanceButtons from './../events/AttendanceButtons'

export default {
  components: {
    AttendanceButtons
  },
  computed: {
    ...mapGetters({
      teamEvents: 'teamEvents'
    })
  },
  data () {
    return {
      isEditing: false,
      eventName: null,
      eventDate: null
    }
  },
  methods: {
    toggleEditing () {
      this.isEditing = !this.isEditing
    },
    saveEvent () {
      this.$store.dispatch('createTeamEvent', {
        teamId: this.teamId,
        name: this.eventName,
        eventDate: this.eventDate
      })
    }
  },
  mounted () {
    this.$store.dispatch('getTeamEvents', this.teamId)
  },
  props: ['teamId']
}
</script>

<style lang="scss">
  .card-header {
    border-bottom: none;
  }
  .table td, .table th {
    padding: 0.3rem;
    border-top: none;
    vertical-align: middle;
  }
</style>

