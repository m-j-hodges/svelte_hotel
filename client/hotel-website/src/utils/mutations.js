import {gql } from '@apollo/client';

export const REGISTER_MUT = gql`
mutation Mutation($username: String!, $password: String!, $email: String!) {
  Register(username: $username, password: $password, email: $email) {
    token
    user {
      email
      password
      username
    }
  }
}
`

export const LOGIN_USER = gql`
mutation LoginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    token
    user {
      password
      username
    }
  }
}
`