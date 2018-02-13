import gql from 'graphql-tag'

const EVENT_BY_ID = gql`
  query EventById($id: ID!) {
    Event(id: $id) {
      id
      name,
      time,
      location,
      team {
        id, name
      }
    }
  }
`

const EVENTS_BY_TEAM = gql`
  query EventsByTeam($teamId: ID!) {
    allEvents(filter:{
      team: {
        id: $teamId
      }
    }) {
      id
      name
      time
    }
  }
`
const CREATE_EVENT = gql`
  mutation CreateEvent($name: String!, $eventDate: DateTime!, $teamId: ID!) {
    createEvent(
      name: $name,
      time: $eventDate,
      teamId: $teamId
    ) {
      id
    }
  } 
`

export default {
  EVENT_BY_ID,
  EVENTS_BY_TEAM,
  CREATE_EVENT
}
