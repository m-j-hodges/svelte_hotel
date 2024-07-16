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

export const NEW_ORDER = gql`
mutation Mutation($username: String!, $input: orderData) {
  saveOrder(username: $username, input: $input) {
    email
    orders {
      total
      startDate
      roomType
      roomPrice
      nightlyRate
      lengthOfStay
      endDate
    }
    password
    username
  }
}
`

export const DELETE_ORDER = gql`
mutation Mutation($username: String!, $orderId: ID!) {
  removeOrder(username: $username, orderId: $orderId) {
    endDate
    lengthOfStay
    nightlyRate
    roomPrice
    roomType
    startDate
    total
  }
}
`