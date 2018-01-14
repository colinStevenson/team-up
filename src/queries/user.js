import gql from 'graphql-tag'

const GET_USER = gql`
  query {
    user {
      id,
      firstName,
      lastName,
      email
    }
  }
`

const CREATE_USER = gql`
  mutation ($idToken: String!, $firstName: String!, $lastName: String!, $email: String!, $gender: Gender!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, firstName: $firstName, lastName: $lastName, email: $email, gender: $gender) {
      id
    }
  }
`

const GET_AUTH0_USER = gql`
  query FindAuth0User($id: String!) {
    User (auth0UserId: $id){
      id
    }
  }
`

export default {
  CREATE_USER,
  GET_USER,
  GET_AUTH0_USER
}
