import { gql } from '@apollo/client';

export const GET_NENDOROIDS = gql`
  query GetNendoroid($chu: ID!) {
    nendoroid(id: $chu) {
      formattedName
      id
      number
      price
      images
      range
      title
      url
      description
      releaseDate
      series {
        nendoroids {
          id
          formattedName
          images
        }
      }
    }
  }
`;
