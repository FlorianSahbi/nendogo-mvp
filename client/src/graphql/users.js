import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      id
      email
      username
      profilePicture {
        url
      }
    }
  }
`;
