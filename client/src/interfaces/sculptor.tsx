import { gql } from '@apollo/client';

export const GET_SCULPTOR = gql`
  query GetSculptor($id: ID!) {
    sculptor(id: $id) {
      id
      name
      nendoroids {
        id
        number
        formattedName
        images
      }
    }
  }
`;
