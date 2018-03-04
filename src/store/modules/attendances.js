import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  attendancesByEventId: {},
  teamAttendanceByEvent: {}
}

const getters = {
  attendancesByEventId: state => state.attendancesByEventId,
  teamAttendanceByEvent: state => state.teamAttendanceByEvent
}

const actions = {
  recordAttendance (context, {eventId, userId, teamId, status}) {
    return apolloClient.mutate({
      mutation: Queries.CREATE_ATTENDANCE,
      variables: {
        eventId,
        userId,
        teamId,
        status
      }
    })
  },
  updateAttendance (context, {attendanceId, eventId, userId, status}) {
    return apolloClient.mutate({
      mutation: Queries.UPDATE_ATTENDANCE,
      variables: {
        attendanceId,
        status
      }
    }).then(result => {
      context.dispatch('getAttendancesByEventId', {eventId, userId, forceNetwork: true})
      context.dispatch('getTeamAttendanceByEvent', {eventId, forceNetwork: true})
    })
  },
  getAttendancesByEventId (context, {eventId, userId, forceNetwork}) {
    return apolloClient.query({
      query: Queries.GET_MOST_RECENT_ATTENDANCE,
      variables: {
        eventId,
        userId
      },
      fetchPolicy: forceNetwork ? 'network-only' : 'cache-first'
    }).then((result) => {
      context.commit('SET_EVENT_ATTENDANCES', result.data.allAttendances)
    }).catch(error => {
      console.error(error)
    })
  },
  getTeamAttendanceByEvent (context, {eventId, forceNetwork}) {
    return apolloClient.query({
      query: Queries.GET_ATTENDANCES_BY_EVENT,
      variables: {
        eventId
      },
      fetchPolicy: forceNetwork ? 'network-only' : 'cache-first'
    }).then(result => {
      context.commit('SET_TEAM_EVENT_ATTENDANCE', {eventId, attendances: result.data.allAttendances})
    })
  }
}

const mutations = {
  SET_EVENT_ATTENDANCES (state, attendances) {
    // clone object in state then set state obj to cloned value to explicitly update the value
    const newVal = Object.assign(state.attendancesByEventId, {})
    attendances.forEach(attendance => {
      newVal[attendance.event.id] = attendance
    })
    state.attendancesByEventId = Object.assign({}, newVal)
  },
  SET_TEAM_EVENT_ATTENDANCE (state, {eventId, attendances}) {
    const newVal = {}
    newVal[eventId] = attendances
    state.teamAttendanceByEvent = Object.assign({}, state.teamAttendanceByEvent, newVal)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
