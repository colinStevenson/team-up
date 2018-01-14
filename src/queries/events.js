import gql from 'graphql-tag'

const EVENT_BY_ID = gql`
  query EventById($id: ID!) {
    Event(id: $id) {
      id
      name,
      time
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

export default {
  EVENT_BY_ID,
  EVENTS_BY_TEAM
}
