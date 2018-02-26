import gql from 'graphql-tag'

const CREATE_ATTENDANCE = gql`
  mutation ($eventId: ID!, $userId: ID!, $status: EventStatus!, $teamId: ID!) {
    createAttendance(
      eventId: $eventId,
      userId: $userId,
      status: $status,
      teamId: $teamId
    ){
      id
    }
  }
`

const UPDATE_ATTENDANCE = gql`
mutation ($attendanceId: ID!, $status: EventStatus!) {
  updateAttendance(
    id: $attendanceId,
    status: $status
  ){
    id
  }
}
`

const GET_ATTENDANCES_BY_EVENT = gql`
  query AttendancesByEvent($eventId: ID!) {
    allAttendances(filter:{
      event: {
        id: $eventId
      }
    }) {
      id,
      status,
      event {
        id
      },
      user {
        id,
        email
        firstName,
        lastName
      }
    }
  }
`

const GET_ATTENDANCES_BY_USER = gql`
  query AttendancesByUser($userId: ID!) {
    allAttendances(filter:{
      user: {
        id: $userId
      }
    }) {
      id,
      status,
      event {
        id,
        name
      }
    }
  }
`

const GET_MOST_RECENT_ATTENDANCE = gql`
  query AttendancesByEventAndUser($eventId: ID!, $userId: ID!) {
    allAttendances(last: 1, filter:{
      event: {
        id: $eventId
      },
      user: {
        id: $userId
      }
    }) {
      id,
      status,
      event {
        id
      }
    }
  }
`

export default {
  CREATE_ATTENDANCE,
  UPDATE_ATTENDANCE,
  GET_ATTENDANCES_BY_EVENT,
  GET_ATTENDANCES_BY_USER,
  GET_MOST_RECENT_ATTENDANCE
}
