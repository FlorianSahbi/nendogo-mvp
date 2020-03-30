import { gql } from '@apollo/client';

export const GET_SCULPTORS = gql`
  query {
    sculptors {
      id
      name
    }
  }
`;