import Vue from 'vue'
import Vuex from 'vuex'
import Queries from '../queries'
import apolloClient from '../apollo'
// import gql from 'graphql-tag'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    teams: null,
    team: null,
    teamMembers: null,
    teamEvents: null,
    isRegisteredUser: null,
    invitations: null,
    acceptedInvitations: []
  },
  getters: {
    user: state => state.user,
    teams: state => state.teams,
    team: state => state.team,
    teamMembers: state => state.teamMembers,
    teamEvents: state => state.teamEvents,
    isRegisteredUser: state => state.isRegisteredUser,
    invitations: state => state.invitations,
    acceptedInvitations: state => state.acceptedInvitations
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    SET_TEAMS (state, teams) {
      state.teams = teams
    },
    SET_TEAM (state, team) {
      state.team = team
    },
    SET_TEAM_MEMBERS (state, teamMembers) {
      state.teamMembers = teamMembers
    },
    SET_TEAM_EVENTS (state, teamEvents) {
      state.teamEvents = teamEvents
    },
    SET_REGISTERED_USER_STATE (state, isRegisteredUser) {
      state.isRegisteredUser = isRegisteredUser
    },
    SET_TEAM_INVITATIONS (state, invitations) {
      state.invitations = invitations
    },
    SET_INVITATION_ACCEPTED (state, invitationId) {
      state.acceptedInvitations.push(invitationId)
    }
  },
  actions: {
    addUserToTeam (context, {invitationId, userId, teamId}) {
      apolloClient.mutate({
        mutation: Queries.ADD_USER_TO_TEAM,
        variables: {
          userId,
          teamId
        }
      }).then((response) => {
        apolloClient.mutate({
          mutation: Queries.SET_INVITE_ACCEPTED,
          variables: {
            id: invitationId
          }
        }).then(res => {
          context.commit('SET_INVITATION_ACCEPTED', invitationId)
        })
      }).catch((error) => {
        // Error
        console.error(error)
      })
    },
    getUser (context) {
      apolloClient.query({
        query: Queries.GET_USER,
        fetchPolicy: 'network-only'
      }).then((result) => {
        const isRegisteredUser = !!result.data.user
        context.commit('SET_REGISTERED_USER_STATE', isRegisteredUser)
        context.commit('SET_USER', result.data.user)
      })
    },
    getTeams (context, userId) {
      apolloClient.query({
        query: Queries.ALL_TEAMS_QUERY,
        variables: {
          userId
        }
      }).then((result) => {
        context.commit('SET_TEAMS', result.data.allTeams)
      })
    },
    getTeam (context, teamId) {
      apolloClient.query({
        query: Queries.TEAM_BY_ID,
        variables: {
          teamId
        }
      }).then((result) => {
        context.commit('SET_TEAM', result.data.Team)
      })
    },
    getTeamMembers (context, teamId) {
      apolloClient.query({
        query: Queries.TEAM_MEMBERS_BY_ID,
        variables: {
          teamId
        }
      }).then((result) => {
        context.commit('SET_TEAM_MEMBERS', result.data.allUsers)
      })
    },
    getTeamEvents (context, teamId) {
      apolloClient.query({
        query: Queries.EVENTS_BY_TEAM,
        variables: {
          teamId
        }
      }).then((result) => {
        context.commit('SET_TEAM_EVENTS', result.data.allEvents)
      })
    },
    sendInvitation (context, {userId, email, teamId}) {
      apolloClient.mutate({
        mutation: Queries.CREATE_INVITATION,
        variables: {
          email,
          userId,
          teamId
        }
      })
    },
    getInvitations (context, email) {
      apolloClient.query({
        query: Queries.GET_TEAM_INVITATIONS,
        variables: {
          email
        }
      }).then((result) => {
        context.commit('SET_TEAM_INVITATIONS', result.data.allInvitations)
      })
    }
  }
})

export default store
