import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!, $email: String!) {
    register(input: { username: $username, email: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;
