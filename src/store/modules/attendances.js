import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  attendancesByEventId: {}
}

const getters = {
  attendancesByEventId: state => state.attendancesByEventId
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
      context.dispatch('getAttendancesByEventId', {eventId, userId, forceNetwork: true})
    })
  },
  getAttendancesByEventId (context, {eventId, userId, forceNetwork}) {
    apolloClient.query({
      query: Queries.GET_MOST_RECENT_ATTENDANCE,
      variables: {
        eventId,
        userId
      },
      fetchPolicy: forceNetwork ? 'network-only' : 'cache-first'
    }).then((result) => {
      context.commit('SET_EVENT_ATTENDANCES', result.data.allAttendances)
    })
  }
}

const mutations = {
  SET_EVENT_ATTENDANCES (state, attendances) {
    attendances.forEach(attendance => {
      state.attendancesByEventId[attendance.event.id] = attendance
      // NOTE: we added const temp and Object.assign() because attendancesByEventId wasn't updating correctly
      const temp = {}
      temp[attendance.event.id] = attendance
      state.attendancesByEventId = Object.assign(temp, state.attendancesByEventId, {})
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
