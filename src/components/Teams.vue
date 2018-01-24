<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm">
        <section class="card">
          <div class="card-body">
            <h2 class="card-title">My Teams</h2>
          </div>
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
              <li v-for="invitation in invitations" class="list-group-item d-flex justify-content-between">
                <span>{{invitation.team.name}}</span>
                <button class="btn btn-primary btn-sm" @click="joinTeam(invitation.team.id)">Join</button>
              </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Queries from '../queries'
export default {
  name: 'Teams',
  computed: {
    ...mapGetters({
      user: 'user',
      teams: 'teams',
      invitations: 'invitations'
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
    joinTeam (teamId) {
      this.$apollo.mutate({
        mutation: Queries.ADD_USER_TO_TEAM,
        variables: {
          userId: this.user.id,
          teamId: teamId
        }
      }).then((response) => {
        console.log(response.data)
        if (response.data && response.data.updateTeam && response.data.updateTeam.id) {
          // update invitation
        }
      }).catch((error) => {
        // Error
        console.error(error)
      })
    }
  },
  watch: {
    user () {
      if (this.user) {
        this.requestTeams()
      }
    }
  }
}
</script>

