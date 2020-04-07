import { gql } from '@apollo/client';

export const ADD_VIEW = gql`
  mutation AddView($type: ENUM_INTERACTION_TYPE, $user: ID!, $nendoroid: ID!) {
    createInteraction(
      input: { data: { type: $type, user: $user, nendoroid: $nendoroid } }
    ) {
      interaction {
        id
      }
    }
  }
`;

export const GET_NENDOROIDS = gql`
  query GetNendoroid($chu: ID!) {
    nendoroid(id: $chu) {
      formattedName
      id
      number
      price
      images
      range
      title
      url
      description
      releaseDate
      series {
        id
        name
        nendoroids {
          id
          formattedName
          images
        }
      }
      manufacturer {
        id
        name
      }
      sculptor {
        id
        name
      }
      interactions {
        user{
          id 
          username
        }
      }
    }
  }
`;
