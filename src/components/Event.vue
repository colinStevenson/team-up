<template>
  <div class="container-fluid" v-if="loading">Loading...</div>
  <div class="container-fluid" v-else>
    <h1>{{Event.name}}</h1>
    <section class="card">
      <div class="card-body">
        {{Event.time}}
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
