import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  attendancesByEventId: {},
  loadingAttendancesByEventId: {}
}

const getters = {
  attendancesByEventId: state => state.attendancesByEventId,
  loadingAttendancesByEventId: state => state.loadingAttendancesByEventId
}

const actions = {
  recordAttendance (context, {eventId, userId, teamId, status}) {
    apolloClient.mutate({
      mutation: Queries.CREATE_ATTENDANCE,
      variables: {
        eventId,
        userId,
        teamId,
        status
      }
    }).then(result => {
      context.dispatch('getAttendancesByEventId', {eventId, userId, forceNetwork: true})
    })
  },
  updateAttendance (context, {attendanceId, eventId, userId, status}) {
    apolloClient.mutate({
      mutation: Queries.UPDATE_ATTENDANCE,
      variables: {
        attendanceId,
        status
      }
    }).then(result => {
      context.dispatch('getAttendancesByEventId', {eventId, userId, forceNetwork: true})
    })
  },
  getAttendancesByEventId (context, {eventId, userId, forceNetwork}) {
    context.commit('SET_ATTENDANCE_LOADING', {eventId, isLoading: true})
    apolloClient.query({
      query: Queries.GET_MOST_RECENT_ATTENDANCE,
      variables: {
        eventId,
        userId
      },
      fetchPolicy: forceNetwork ? 'network-only' : 'cache-first'
    }).then((result) => {
      context.commit('SET_EVENT_ATTENDANCES', result.data.allAttendances)
      context.commit('SET_ATTENDANCE_LOADING', {eventId, isLoading: false})
    }).catch(error => {
      context.commit('SET_ATTENDANCE_LOADING', {eventId, isLoading: false})
      console.error(error)
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
  SET_ATTENDANCE_LOADING (state, {eventId, isLoading}) {
    state.loadingAttendancesByEventId[eventId] = isLoading
    state.loadingAttendancesByEventId = Object.assign({}, state.loadingAttendancesByEventId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
