import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  attendances: null,
  currentAttendance: null
}

const getters = {
  attendances: state => state.attendances,
  currentAttendance: state => state.currentAttendance
}

const actions = {
  recordAttendance (context, {eventId, userId, status}) {
    apolloClient.mutate({
      mutation: Queries.CREATE_ATTENDANCE,
      variables: {
        eventId,
        userId,
        status
      }
    }).then(result => {
      console.log('new attendance recorded: ' + status + ' for event ' + eventId)
      context.dispatch('getCurrentAttendance', {eventId, userId, forceNetwork: true})
    })
  },
  getAttendances (context, eventId) {
    apolloClient.query({
      query: Queries.GET_ATTENDANCES_BY_EVENT,
      variables: {
        eventId
      }
    }).then((result) => {
      context.commit('SET_EVENT_ATTENDANCES', result.data.allAttendances)
    })
  },
  getCurrentAttendance (context, {eventId, userId, forceNetwork}) {
    apolloClient.query({
      query: Queries.GET_MOST_RECENT_ATTENDANCE,
      variables: {
        eventId,
        userId
      },
      fetchPolicy: forceNetwork ? 'network-only' : 'cache-first'
    }).then((result) => {
      context.commit('SET_CURRENT_ATTENDANCE', result.data.allAttendances[0])
    })
  }
}

const mutations = {
  SET_EVENT_ATTENDANCES (state, attendances) {
    state.attendances = attendances
  },
  SET_CURRENT_ATTENDANCE (state, currentAttendance) {
    state.currentAttendance = currentAttendance
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
