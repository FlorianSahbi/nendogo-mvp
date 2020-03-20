import { gql } from '@apollo/client';

export const GET_SERIES = gql`
  query GetSeries($start: Int) {
    series(start: $start, sort:"name") {
      id
      name
      nendoroids {
        name
        images
      }
    }
  }
`;