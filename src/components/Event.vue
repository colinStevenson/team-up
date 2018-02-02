<template>
  <div class="container-fluid" v-if="loading">Loading...</div>
  <div class="container-fluid" v-else>
    <h1>{{Event.name}}</h1>
    <section class="card">
      <div class="card-body">
        {{$moment(Event.time).format('MMM Do [at] hh:mma')}}
      </div>
      <div class="card-body">
        <div class="h3">Are you in?</div>
        <button class="btn btn-success disabled">Yes</button>
        <button class="btn btn-danger">No</button>
        <button class="btn btn-link">Maybe</button>
      </div>  
    </section>
  </div>
</template>
<script>
import Queries from '../queries'
export default {
  name: 'Event',
  props: ['id'],
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
  }
}
</script>
