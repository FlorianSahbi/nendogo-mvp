import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from "./client";
import { ApolloProvider, useQuery, gql } from '@apollo/client';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  console.log(data)
  return data.isLoggedIn ? <App /> : <App />;
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <IsLoggedIn />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
