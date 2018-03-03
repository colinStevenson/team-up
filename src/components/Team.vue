<template>
  <div v-if="hasSufficientData">
    <div class="page-header">
        <div class="container">
          <h1>{{team.name}}</h1>
        </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <events :team-id="id"></events>
        </div>
        <div class="col-md-4">
          <members :team-id="id"></members>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Events from './team/Events'
import Members from './team/Members'
import RequiresRegistrationMixin from './mixins/RequiresRegistrationMixin'

export default {
  name: 'Teamuser',
  components: {
    Events,
    Members
  },
  computed: {
    ...mapGetters([
      'team',
      'user'
    ]),
    hasSufficientData () {
      return !!this.team
    }
  },
  created () {
    this.$store.dispatch('getTeam', this.id)
    this.$store.dispatch('getUserTeamRole', {
      userId: this.user.id,
      teamId: this.id
    })
  },
  mixins: [
    RequiresRegistrationMixin
  ],
  props: ['id']
}
</script>
