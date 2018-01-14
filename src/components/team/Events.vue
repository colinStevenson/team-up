<template>
  <section class="card">
    <div class="card-body">
      <h3 class="card-title h4">Events</h3>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="event in teamEvents" class="list-group-item">
        <router-link :to="`/event/${event.id}`">{{event.name}}</router-link>
      </li>
    </ul>
    <div class="card-body">
      <button class="btn btn-primary card-link">Add Event</button>
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
  mounted () {
    this.$store.dispatch('getTeamEvents', this.teamId)
  },
  props: ['teamId']
}
</script>

