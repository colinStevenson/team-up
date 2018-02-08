<template>
  <div class="container-fluid" v-if="loading">Loading...</div>
  <div class="container-fluid" v-else>
    <h3>{{Event.team.name}}</h3>
    <section class="card">
      <div class="card-header">
        {{Event.name}}
      </div>
      <div class="card-body">
        <h5 class="card-title">
          Time: {{$moment(Event.time).format('MMM Do [at] hh:mma')}}
        </h5>
        <h5 class="card-title">
          Location: {{Event.location}}
        </h5>
      </div>
      <div class="card-body">
        <div class="h5">Are you in?</div>
        <button class="btn btn-success btn-lg" v-bind:class="{ disabled: currentAttendance.status == 'Yes'}" v-on:click="updateEventStatus('Yes')">YES</button>
        <button class="btn btn-warning btn-lg" v-bind:class="{ disabled: currentAttendance.status == 'Maybe'}" v-on:click="updateEventStatus('Maybe')">MAYBE</button>
        <button class="btn btn-danger btn-lg" v-bind:class="{ disabled: currentAttendance.status == 'No'}" v-on:click="updateEventStatus('No')">NO</button>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Queries from '../queries'

export default {
  name: 'Event',
  props: ['id'],
  computed: {
    ...mapGetters({
      user: 'user',
      event: 'event',
      currentAttendance: 'currentAttendance'
    })
  },
  data () {
    return {
      loading: 0,
      Event: {}
    }
  },
  apollo: {
    Event: {
      query: Queries.EVENT_BY_ID,
      variables () {
        return {
          id: this.id
        }
      }
    }
  },
  methods: {
    requestAttendances () {
      this.$store.dispatch('getCurrentAttendance', {eventId: this.id, userId: this.user.id})
    },
    updateEventStatus (status) {
      this.$store.dispatch('recordAttendance', {
        eventId: this.id,
        userId: this.user.id,
        status: status
      })
    }
  },
  mounted () {
    this.requestAttendances()
  }
}
</script>
