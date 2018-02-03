import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  role: null,
  roleLoading: null
}

const getters = {
  role: state => state.role,
  roleLoading: state => state.roleLoading
}

const actions = {
  getUserTeamRole (context, {teamId, userId}) {
    context.commit('SET_ROLE_LOADING', true)
    apolloClient.query({
      query: Queries.USER_TEAM_ROLE,
      variables: {
        userId,
        teamId
      },
      fetchPolicy: 'network-only'
    }).then((result) => {
      const role = result.data && result.data.allRoles && result.data.allRoles && result.data.allRoles[0] ? result.data.allRoles[0].role : null
      context.commit('SET_USER_TEAM_ROLE', role)
      context.commit('SET_ROLE_LOADING', false)
    })
  }
}

const mutations = {
  SET_USER_TEAM_ROLE (state, role) {
    state.role = role
  },
  SET_ROLE_LOADING (state, loading) {
    state.roleLoading = loading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
