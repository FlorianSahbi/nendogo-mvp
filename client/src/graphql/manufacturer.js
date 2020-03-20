import { gql } from '@apollo/client';

export const GET_NENDOROIDS = gql`
  query Nendo($chu: String) {
    manufacturers(where: { name: $chu }) {
      id
      name
    }
  }
`;
