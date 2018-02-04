import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  invitations: null,
  acceptedInvitations: [],
  unacceptedInvitations: null,
  loadingUnacceptedInvitations: null
}
const getters = {
  invitations: state => state.invitations,
  acceptedInvitations: state => state.acceptedInvitations,
  unacceptedInvitations: state => state.unacceptedInvitations,
  loadingUnacceptedInvitations: state => state.loadingUnacceptedInvitations
}
const actions = {
  sendInvitation (context, {userId, email, teamId}) {
    apolloClient.mutate({
      mutation: Queries.CREATE_INVITATION,
      variables: {
        email,
        userId,
        teamId
      }
    }).then(result => {
      context.dispatch('getUnacceptedInvitations', {
        teamId,
        forceNetwork: true
      })
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
  },
  getUnacceptedInvitations (context, {teamId, forceNetwork}) {
    context.commit('SET_LOADING_UNACCEPTED_INVITATIONS', true)
    apolloClient.query({
      query: Queries.GET_UNACCEPTED_INVITATIONS,
      variables: {
        teamId
      },
      fetchPolicy: forceNetwork ? 'network-only' : 'cache-first'
    }).then(result => {
      context.commit('SET_UNACCEPTED_INVITATIONS', result.data.allInvitations)
      context.commit('SET_LOADING_UNACCEPTED_INVITATIONS', false)
    })
  }
}
const mutations = {
  SET_TEAM_INVITATIONS (state, invitations) {
    state.invitations = invitations
  },
  SET_INVITATION_ACCEPTED (state, invitationId) {
    state.acceptedInvitations.push(invitationId)
  },
  SET_UNACCEPTED_INVITATIONS (state, invitations) {
    state.unacceptedInvitations = invitations
  },
  SET_LOADING_UNACCEPTED_INVITATIONS (state, loading) {
    state.loadingUnacceptedInvitations = loading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
