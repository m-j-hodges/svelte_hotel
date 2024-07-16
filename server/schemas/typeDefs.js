const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    orders: [Orders]
  }

  type Orders {
    _id: ID
    roomType: String
    roomPrice: Int
    startDate: String
    endDate: String
    lengthOfStay: Int
    nightlyRate: Int
    total: Int
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
    amenities: [Amenities]
  }

  type Amenities {
    hotTub: Boolean
    KingSizeBed: Boolean
    QueenSizeBed: Boolean
    TV: Boolean
    Refrigerator: Boolean
    wifi: Boolean
  }
  input AmenitiesInput {
    hotTub: Boolean
    KingSizeBed: Boolean
    QueenSizeBed: Boolean
    TV: Boolean
    Refrigerator: Boolean
    wifi: Boolean
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

input orderData {
  roomType: String
  roomPrice: Int
  startDate: String
  endDate: String
  lengthOfStay: Int
  total: Int
}

  type CreateRoomsPayload {
    rooms: [Rooms]
  }

  type Query {
    Rooms: [Rooms]
    Room(_id: ID!): Rooms!
    User(username: String!): User
    getOrder(username:String!) : [Orders]
    getAmenities(roomType: String!) : [Amenities]
  }
  type Mutation {
    deleteAllRooms(input: [DeleteRoomsInput]): [Rooms]
    User(username: String!, password: String!, email: String!): User
    Rooms(roomType: String!, roomPrice: Int!, discounted: Boolean!, numAvailable: Int!): Rooms
    createUsers(input: [CreateUserInput!]!): CreateUsersPayload
    createRooms(input: [CreateRoomsInput]): [Rooms]
    addAmenities(roomType: String!, input: AmenitiesInput): Rooms
    deleteRooms(_id: ID!): Rooms
    updateRoom(_id: ID!, imgURL: String!): Rooms
    Register(username: String!, password: String!, email: String!): Auth
    loginUser(username:String!, password: String!) : Auth
    saveOrder(username:String!, input: orderData) : User
    removeOrder(username:String!, orderId: ID!) : [Orders]
  }
`

module.exports = typeDefs;