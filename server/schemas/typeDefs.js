const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  input CreateUserInput {
    username: String!
    email: String
    password: String
  }

  input CreateRoomsInput {
    roomType: String!
    roomPrice: Int!
    discounted: Boolean
    numAvailable: Int
    imgURL: String
  }
  
  type Rooms {
    _id: ID
    roomType: String
    roomPrice: Int
    discounted: Boolean
    numAvailable: Int
    imgURL: String
  }

  type CreateUserPayload {
    user: User!
  }

  type CreateUsersPayload {
    user: [User]
  }

type CreateRoomPayload {
  room: Rooms!
}

input DeleteRoomsInput {
  _id: ID
  roomType: String
  roomPrice: Int
  discounted: Boolean
  numAvailable: Int
}

type Auth {
  token: ID!
  user: User
}

  type CreateRoomsPayload {
    rooms: [Rooms]
  }

  type Query {
    Rooms: [Rooms]
    Room(_id: ID!): Rooms!
    User(username: String!): User
  }
  type Mutation {
    deleteAllRooms(input: [DeleteRoomsInput]): [Rooms]
    User(username: String!, password: String!, email: String!): User
    Rooms(roomType: String!, roomPrice: Int!, discounted: Boolean!, numAvailable: Int!): Rooms
    createUsers(input: [CreateUserInput!]!): CreateUsersPayload
    createRooms(input: [CreateRoomsInput]): [Rooms]
    deleteRooms(_id: ID!): Rooms
    updateRoom(_id: ID!, imgURL: String!): Rooms
    Register(username: String!, password: String!, email: String!): Auth
  }
`

module.exports = typeDefs;