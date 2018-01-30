import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  user: null,
  isRegisteredUser: null
}

const getters = {
  user: state => state.user,
  isRegisteredUser: state => state.isRegisteredUser
}

const actions = {
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
  }
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_REGISTERED_USER_STATE (state, isRegisteredUser) {
    state.isRegisteredUser = isRegisteredUser
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
