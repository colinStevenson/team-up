import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  teamEvents: null
}
const getters = {
  teamEvents: state => state.teamEvents
}
const actions = {
  getTeamEvents (context, teamId) {
    apolloClient.query({
      query: Queries.EVENTS_BY_TEAM,
      variables: {
        teamId
      }
    }).then((result) => {
      context.commit('SET_TEAM_EVENTS', result.data.allEvents)
    })
  }
}
const mutations = {
  SET_TEAM_EVENTS (state, teamEvents) {
    state.teamEvents = teamEvents
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
