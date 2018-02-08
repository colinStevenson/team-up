import gql from 'graphql-tag'

const USER_TEAM_ROLE = gql`
  query UserTeamRole($teamId: ID!, $userId: ID!) {
    allRoles(filter:{
      team:{
        id:$teamId
      },
      user:{
        id:$userId
      }
    }) {
      role
    }
  }
`

export default {
  USER_TEAM_ROLE
}
