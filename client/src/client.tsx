// @ts-nocheck
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { resolvers, typeDefs } from './localState/resolvers';
import { setContext } from "apollo-link-context";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('nendogo');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const link = new HttpLink({
  uri: "http://localhost:1337/graphql",
  credentials: 'same-origin'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
  typeDefs,
  resolvers
});

export default client;
