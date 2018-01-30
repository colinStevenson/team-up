import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  invitations: null,
  acceptedInvitations: []
}
const getters = {
  invitations: state => state.invitations,
  acceptedInvitations: state => state.acceptedInvitations
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
const mutations = {
  SET_TEAM_INVITATIONS (state, invitations) {
    state.invitations = invitations
  },
  SET_INVITATION_ACCEPTED (state, invitationId) {
    state.acceptedInvitations.push(invitationId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
