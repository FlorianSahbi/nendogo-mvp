import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      username
      profilePicture {
        url
      }
      interactions {
        id
        nendoroid {
          id
          formattedName
          images
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id:ID!, $username: String, $email: String){
    updateUser(
      input: {
        where: { id: $id }
        data: { username: $username, email: $email }
      }
    ) {
      user {
        username
      }
    }
  }
`;