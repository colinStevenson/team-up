<template>
  <section class="card">
    <div class="card-header">
      <h3 class="card-title">Games</h3>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="event in teamEvents" class="list-group-item d-flex justify-content-between">
        <div><router-link :to="`/event/${event.id}`">{{event.name}}</router-link></div>
        <div>{{$moment(event.time).format('MMM Do [at] hh:mma')}}</div>
        <div>
          <button class="btn btn-success btn-sm" type="button">I'll be there!</button>
          <button class="btn btn-warning btn-sm" type="button">Not sure</button>
          <button class="btn btn-danger btn-sm" type="button">I can't make it</button>
        </div>
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

export default {
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
      // console.log(this.eventName, this.eventDate)
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

