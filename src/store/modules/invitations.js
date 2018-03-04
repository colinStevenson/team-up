import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  invitations: null,
  acceptedInvitations: [],
  unacceptedInvitations: null
}
const getters = {
  invitations: state => state.invitations,
  acceptedInvitations: state => state.acceptedInvitations,
  unacceptedInvitations: state => state.unacceptedInvitations
}
const actions = {
  sendInvitation (context, {userId, email, teamId}) {
    return apolloClient.mutate({
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
  getInvitations (context, {email, forceNetwork}) {
    return apolloClient.query({
      query: Queries.GET_TEAM_INVITATIONS,
      variables: {
        email
      },
      fetchPolicy: forceNetwork ? 'network-only' : 'cache-first'
    }).then((result) => {
      context.commit('SET_TEAM_INVITATIONS', result.data.allInvitations)
    })
  },
  getUnacceptedInvitations (context, {teamId, forceNetwork}) {
    return apolloClient.query({
      query: Queries.GET_UNACCEPTED_INVITATIONS,
      variables: {
        teamId
      },
      fetchPolicy: forceNetwork ? 'network-only' : 'cache-first'
    }).then(result => {
      context.commit('SET_UNACCEPTED_INVITATIONS', result.data.allInvitations)
    })
  }
}
const mutations = {
  SET_TEAM_INVITATIONS (state, invitations) {
    state.invitations = invitations
  },
  SET_INVITATION_ACCEPTED (state, invitationId) {
    const invitations = state.acceptedInvitations.slice(0)
    invitations.push(invitationId)
    state.acceptedInvitations = invitations
  },
  SET_UNACCEPTED_INVITATIONS (state, invitations) {
    state.unacceptedInvitations = invitations
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
