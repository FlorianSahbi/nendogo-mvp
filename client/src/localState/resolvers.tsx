import { gql } from "@apollo/client";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    myId: String!
    authenticationModal: Boolean!
  }
`;

export const resolvers = {};