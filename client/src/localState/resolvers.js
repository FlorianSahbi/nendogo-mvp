import { gql } from "@apollo/client";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    myId: String!
  }
`;

export const resolvers = {};