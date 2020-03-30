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

export const LOGIN = gql`
  mutation Login($identifier: String! $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        email
        username
      }
    }
  }
`;