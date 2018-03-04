<template>
  <div>
    <div class="page-header">
      <div class="container">
        <h1>My Teams</h1>
      </div>
    </div>
     <div class="container">
        <section class="card" :class="{'is-loading': isLoadingTeams}" v-if="teams && teams.length">
          <ul class="list-group list-group-flush">
              <li v-for="team in teams" class="list-group-item">
                <router-link :to="`/team/${team.id}`">{{team.name}}</router-link>
              </li>
          </ul>
        </section>
        <section class="card" :class="{'is-loading': isLoadingTeams}" v-if="invitations && invitations.length ">
          <div class="card-body">
            <h2 class="card-title">Invitations</h2>
          </div>
          <ul class="list-group list-group-flush">
              <li 
                v-for="invitation in invitations" 
                class="list-group-item d-flex justify-content-between">
                <span>{{invitation.team.name}}</span>
                <button class="btn btn-primary btn-sm" @click="joinTeam(invitation.team.id, invitation.id)">Join</button>
              </li>
          </ul>
        </section>
        <section class="jumbotron" v-if="!hasTeamsOrInvites">
          <p>Please contact your team manager to obtain an invite to your teams page. Be sure they use the email you have created an account with to send the invite.</p>
        </section>
      </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import RequiresRegistrationMixin from './mixins/RequiresRegistrationMixin'

export default {
  name: 'Teams',
  computed: {
    ...mapGetters([
      'user',
      'teams',
      'invitations',
      'acceptedInvitations'
    ]),
    hasTeamsOrInvites () {
      return (this.teams && this.teams.length) || (this.invitations && this.invitations.length)
    }
  },
  data () {
    return {
      isLoadingTeams: false,
      isLoadingInvitations: false
    }
  },
  mounted () {
    if (this.user) {
      this.requestTeams()
      this.requestInvitations()
    }
  },
  methods: {
    ...mapActions([
      'getTeams',
      'getInvitations',
      'addUserToTeam'
    ]),
    requestInvitations (forceNetwork) {
      this.isLoadingInvitations = true
      this.getInvitations({email: this.user.email, forceNetwork}).then(() => {
        this.isLoadingInvitations = false
      })
    },
    requestTeams (forceNetwork) {
      this.isLoadingTeams = true
      this.getTeams({userId: this.user.id, forceNetwork}).then(() => {
        this.isLoadingTeams = false
      })
    },
    joinTeam (teamId, invitationId) {
      this.isLoadingInvitations = true
      this.addUserToTeam({
        invitationId,
        teamId,
        userId: this.user.id
      }).then(() => {
        this.requestTeams(true)
        this.requestInvitations(true)
      })
    },
    checkRedirect () {
      if (
        this.teams &&
        this.teams.length === 1 &&
        this.invitations &&
        this.invitations.length === 0
      ) {
        this.$router.replace(`/team/${this.teams[0].id}`)
      }
    }
  },
  mixins: [
    RequiresRegistrationMixin
  ],
  watch: {
    user () {
      if (this.user) {
        this.requestTeams(false)
      }
    },
    invitations () {
      this.checkRedirect()
    },
    teams () {
      this.checkRedirect()
    }
  }
}
</script>
