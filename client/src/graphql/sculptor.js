import { gql } from '@apollo/client';

export const GET_NENDOROIDS = gql`
query Nendo($chu: String) {
  sculptors(where: { name: $chu }) {
    id
    name
  }
}
`;
