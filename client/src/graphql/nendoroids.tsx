import { gql } from '@apollo/client';

export const GET_NENDOROIDS = gql`
  query GetNendoroids($min: Int, $max: Int, $start: Int, $searchValue: String) {
    nendoroids(start: $start, sort: "number", where: { number_gte: $min, number_lte: $max, formattedName_contains: $searchValue }) {
      formattedName
      id
      number
      price
      images
      range
    }
  }
`;
