import { ApolloClient, HttpLink, InMemoryCache, toReference, gql } from '@apollo/client';
import { resolvers, typeDefs } from './localState/resolvers';
import { setContext } from "apollo-link-context";

const IS_USER_LOGGED_IN = gql`
  query isUserLoggedIn {
    isLoggedIn @client
  }
`;

const MY_ID = gql`
  query myId {
    myId @client
  }
`;

const AUTHENTICATE_MODAL = gql`
  query authenticateModal {
    authenticationModal @client
  }
`;

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
  query: AUTHENTICATE_MODAL,
  data: {
    authenticationModal: false,
  }
});

cache.writeQuery({
  query: IS_USER_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem("nendogo"),
  }
});

cache.writeQuery({
  query: MY_ID,
  data: {
    myId: localStorage.getItem("myId"),
  }
});

export default client;
