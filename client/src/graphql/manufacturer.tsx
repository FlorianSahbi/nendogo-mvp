import { gql } from '@apollo/client';

export const GET_MANUFACTURER = gql`
  query GetManufacturer($id: ID!) {
    manufacturer(id: $id) {
      id
      name
      nendoroids {
        id
        formattedName
        images
        number
        images
      }
    }
  }
`;
