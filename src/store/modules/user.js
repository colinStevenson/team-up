import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  user: null,
  isRegisteredUser: null,
  loadingUserData: true
}

const getters = {
  user: state => state.user,
  isRegisteredUser: state => state.isRegisteredUser,
  loadingUserData: state => state.loadingUserData
}

const actions = {
  createUser (context, {idToken, email, firstName, lastName, gender, callback}) {
    apolloClient.mutate({
      mutation: Queries.CREATE_USER,
      variables: {
        idToken,
        email,
        firstName,
        lastName,
        gender
      }
    }).then(response => {
      if (response && response.data && response.data.createUser && response.data.createUser.id) {
        context.dispatch('getUser')
        callback(response.data.createUser)
      }
    })
  },
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
    context.commit('SET_LOADING_USER_DATA', true)
    apolloClient.query({
      query: Queries.GET_USER,
      fetchPolicy: 'network-only'
    }).then((result) => {
      const isRegisteredUser = !!result.data.user
      context.commit('SET_REGISTERED_USER_STATE', isRegisteredUser)
      context.commit('SET_USER', result.data.user)
      context.commit('SET_LOADING_USER_DATA', false)
    })
  }
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_REGISTERED_USER_STATE (state, isRegisteredUser) {
    state.isRegisteredUser = isRegisteredUser
  },
  SET_LOADING_USER_DATA (state, isLoadingUserData) {
    state.loadingUserData = isLoadingUserData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
