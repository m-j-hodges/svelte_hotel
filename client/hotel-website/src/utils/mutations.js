import {gql } from '@apollo/client';

export const REGISTER_MUT = gql`
mutation Mutation($username: String!, $password: String!, $email: String!) {
  Register(username: $username, password: $password, email: $email) {
    email
    password
    username
  }
}
`