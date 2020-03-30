import { gql } from '@apollo/client';

export const GET_NENDOROIDS = gql`
  query Nendo($id: ID!) {
    serie(id: $id) {
      id
      name
      nendoroids {
        formattedName
        images
        id
      }
    }
  }
`;
