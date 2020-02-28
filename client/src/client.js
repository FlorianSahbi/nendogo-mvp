import { ApolloClient, HttpLink, InMemoryCache, toReference, gql } from '@apollo/client';
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

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        nendoroid(existingData, { args, toReference }) {
          return existingData || toReference({ __typename: 'Nendoroid', id: args.id });
        }
      }
    },
  },
});

const link = new HttpLink({
  uri: "http://localhost:1337/graphql",
  credentials: 'same-origin'
})

const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
  typeDefs,
  resolvers
});

cache.writeQuery({
  query: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  data: {
    isLoggedIn: !!localStorage.getItem("nendogo"),
  }
});

export default client;
