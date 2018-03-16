// import Queries from '../../../queries'
// import apolloClient from '../../../apollo'

const state = {
  loadingRouteData: false
}

const getters = {
  loadingRouteData: state => state.loadingRouteData
}

const actions = {
  getTeamRouteData (context, {userId, teamId}) {
    context.commit('SET_LOADING_ROUTE_DATA', true)
    return Promise.all([
      context.dispatch('getTeam', teamId),
      context.dispatch('getTeams', {userId}),
      context.dispatch('getUserTeamRole', {userId, teamId}),
      context.dispatch('getTeamEvents', {teamId}),
      context.dispatch('getTeamMembers', teamId)
    ]).then(results => {
      context.commit('SET_LOADING_ROUTE_DATA', false)
    })
  },
  getTeamsRouteData (context, {userId, email}) {
    context.commit('SET_LOADING_ROUTE_DATA', true)
    return Promise.all([
      context.dispatch('getTeams', {userId}),
      context.dispatch('getInvitations', {email})
    ]).then(results => {
      context.commit('SET_LOADING_ROUTE_DATA', false)
    })
  },
  getEventRouteData (context, {eventId, userId}) {
    context.commit('SET_LOADING_ROUTE_DATA', true)
    return Promise.all([
      context.dispatch('getEvent', eventId),
      context.dispatch('getTeamAttendanceByEvent', {eventId}),
      context.dispatch('getAttendancesByEventId', {eventId, userId})
    ]).then(results => {
      context.commit('SET_LOADING_ROUTE_DATA', false)
    })
  }
}

const mutations = {
  SET_LOADING_ROUTE_DATA (state, isLoading) {
    state.loadingRouteData = isLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
