import { gql } from '@apollo/client';

export const GET_SERIES = gql`
  query GetSeries($start: Int) {
    series(start: $start) {
      id
      name
      nendoroids {
        name
        images
      }
    }
  }
`;