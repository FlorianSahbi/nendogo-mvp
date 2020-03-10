import { gql } from '@apollo/client';

export const GET_SERIES = gql`
  query {
    series {
      id
      name
      nendoroids {
        name
        images
      }
    }
  }
`;