<template>
  <div>
    <site-loader v-if="isLoading"></site-loader>
    <div v-if="hasSufficientData && !isLoading">
      <div class="page-header">
          <div class="container">
            <h1>{{team.name}}</h1>
          </div>
      </div>
      <div class="container">
        <div class="mb-3">
          <router-link to="/teams" v-if="teams && teams.length > 1">
            <i class="material-icons md-16">&#xE5C4;</i>Back to Teams
          </router-link>
        </div>
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Events from './team/Events'
import Members from './team/Members'
import RouteMixin from './mixins/RouteMixin'
import RequiresRegistrationMixin from './mixins/RequiresRegistrationMixin'

export default {
  name: 'Team',
  components: {
    Events,
    Members
  },
  computed: {
    ...mapGetters([
      'team',
      'teams',
      'user'
    ]),
    hasSufficientData () {
      return !!this.team
    }
  },
  created () {
    this.getTeamRouteData({
      userId: this.user.id,
      teamId: this.id
    })
  },
  methods: {
    ...mapActions([
      'getTeamRouteData'
    ])
  },
  mixins: [
    RouteMixin,
    RequiresRegistrationMixin
  ],
  props: ['id']
}
</script>
