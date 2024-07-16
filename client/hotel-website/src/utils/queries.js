import {gql} from '@apollo/client';

export const QUERY_ROOMS = gql`
query Rooms {
  Rooms {
    discounted
    roomPrice
    numAvailable
    roomType
    imgURL
  }
}`;

export const GET_ORDER = gql`
query Query($username: String!) {
  getOrder(username: $username) {
    lengthOfStay
    nightlyRate
    roomPrice
    roomType
    startDate
    total
    endDate
    _id
  }
}
`
// provide the roomType to gql and it will return the amenities for that roomType
export const GET_AMENITIES = gql`
query Query($roomType: String!) {
  getAmenities(roomType: $roomType) {
    KingSizeBed
    QueenSizeBed
    Refrigerator
    TV
    wifi
    hotTub
  }
}`