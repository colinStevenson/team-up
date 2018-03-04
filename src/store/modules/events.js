import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  teamEvents: null,
  event: null
}
const getters = {
  teamEvents: state => state.teamEvents,
  event: state => state.event
}
const actions = {
  createTeamEvent (context, {name, location, eventDate, teamId}) {
    return apolloClient.mutate({
      mutation: Queries.CREATE_EVENT,
      variables: {
        name,
        eventDate,
        location,
        teamId
      }
    }).catch(error => {
      console.error(error)
    })
  },
  getTeamEvents (context, {teamId, forceNetwork}) {
    return apolloClient.query({
      query: Queries.EVENTS_BY_TEAM,
      variables: {
        teamId
      },
      fetchPolicy: forceNetwork ? 'network-only' : 'cache-first'
    }).then((result) => {
      context.commit('SET_TEAM_EVENTS', result.data.allEvents)
    })
  },
  getEvent (context, eventId) {
    return apolloClient.query({
      query: Queries.EVENT_BY_ID,
      variables: {
        id: eventId
      }
    }).then(result => {
      context.commit('SET_EVENT', result.data.Event)
    })
  }
}
const mutations = {
  SET_TEAM_EVENTS (state, teamEvents) {
    state.teamEvents = teamEvents
  },
  SET_EVENT (state, event) {
    state.event = event
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
