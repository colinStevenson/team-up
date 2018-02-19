<template>
  <div>
    <div class="page-header">
      <div class="container-fluid">
        <h1>My Teams</h1>
      </div>
    </div>
     <div class="container-fluid">
        <section class="card">
          <ul class="list-group list-group-flush">
              <li v-for="team in teams" class="list-group-item">
                <router-link :to="`/team/${team.id}`">{{team.name}}</router-link>
              </li>
          </ul>
        </section>
      </div>
      <div class="col-sm">
        <section class="card" v-if="invitations && invitations.length ">
          <div class="card-body">
            <h2 class="card-title">Invitations</h2>
          </div>
          <ul class="list-group list-group-flush">
              <li 
                v-for="invitation in invitations" 
                class="list-group-item d-flex justify-content-between invitation" 
                :class="acceptedInvitations.includes(invitation.id) ? 'accepted' : ''">
                <span>{{invitation.team.name}}</span>
                <button class="btn btn-primary btn-sm" @click="joinTeam(invitation.team.id, invitation.id)">Join</button>
              </li>
          </ul>
        </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import RequiresRegistrationMixin from './mixins/RequiresRegistrationMixin'

export default {
  name: 'Teams',
  computed: {
    ...mapGetters({
      user: 'user',
      teams: 'teams',
      invitations: 'invitations',
      acceptedInvitations: 'acceptedInvitations'
    })
  },
  mounted () {
    if (this.user) {
      this.requestTeams()
    }
  },
  data () {
    return {
      loading: true,
      allTeams: []
    }
  },
  methods: {
    requestTeams () {
      this.$store.dispatch('getTeams', this.user.id)
      this.$store.dispatch('getInvitations', this.user.email)
    },
    joinTeam (teamId, invitationId) {
      this.$store.dispatch('addUserToTeam', {
        invitationId,
        teamId,
        userId: this.user.id
      })
    }
  },
  mixins: [
    RequiresRegistrationMixin
  ],
  watch: {
    user () {
      if (this.user) {
        this.requestTeams()
      }
    }
  }
}
</script>
<style lang="scss">
  .invitation{
    transition: 0.3s opacity ease-out;

    &.accepted{
      opacity: 0;
    }
  }
</style>
