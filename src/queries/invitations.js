import gql from 'graphql-tag'

const CREATE_INVITATION = gql`
  mutation ($teamId: ID!, $email: String!, $userId: ID!) {
    createInvitation(
      teamId: $teamId
      email: $email,
      userId: $userId,
      dateRequested:"2017-12-29T15:03:06.377Z"
    ){
      id
    }
  }
`

const GET_TEAM_INVITATIONS = gql`
  query ($email: String!) {
    allInvitations(filter:{
      email: $email
    }) {
      id
      team {
        id,
        name
      }
    }
  }
`

export default {
  CREATE_INVITATION,
  GET_TEAM_INVITATIONS
}
