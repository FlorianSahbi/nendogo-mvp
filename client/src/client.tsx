// @ts-nocheck
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from "@apollo/link-error";
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`));
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = new HttpLink({
  uri: "http://localhost:1337/graphql",
  credentials: 'same-origin'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: authLink.concat(errorLink.concat(link)),
  typeDefs,
  resolvers
});

export default client;
