import { gql } from '@apollo/client';

export const CREATE_INTERACTION = gql`
  mutation CreateInteraction($type: ENUM_INTERACTION_TYPE, $user: ID!, $nendoroid: ID!) {
    createInteraction(
      input: { data: { type: $type, user: $user, nendoroid: $nendoroid } }
    ) {
      interaction {
        id
      }
    }
  }
`;

export const DELETE_INTERACTION = gql`
  mutation DeleteInteraction($id: ID!){
    deleteInteraction(input: { where: { id: $id } }) {
      interaction {
        id
      }
    }
  }
`;
