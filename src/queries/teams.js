import gql from 'graphql-tag'

const ALL_TEAMS_QUERY = gql`
  query AllTeams($userId: ID!) {
    allTeams(filter: {
      users_some: {
        id: $userId
      }
    }) {
      id
      createdAt
      name
    }
  }
`
const TEAM_BY_ID = gql`
  query TeamById($teamId: ID!) {
    Team(id: $teamId) {
      id
      name
    }
  }
`

const TEAM_MEMBERS_BY_ID = gql`
  query TeamMembersById($teamId: ID!) {
    allUsers(filter:{
      teams_some: {
        id: $teamId
      }
    }) {
      id
      firstName
      lastName
    }
  }
`
const ADD_USER_TO_TEAM = gql`
  mutation ($userId: ID!, $teamId: ID!) {
    addToUserOnTeam(teamsTeamId: $teamId, usersUserId: $userId) {
      usersUser {
        id
      }
    }
  }
`

export default {
  ALL_TEAMS_QUERY,
  TEAM_BY_ID,
  TEAM_MEMBERS_BY_ID,
  ADD_USER_TO_TEAM
}
