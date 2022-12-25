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