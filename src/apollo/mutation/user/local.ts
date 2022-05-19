import gql from 'graphql-tag';

export const MUTATION_UPDATE_CURRENT_USER = gql`
  mutation ($currentUser: User) {
    updateCurrentUser(currentUser: $currentUser) @client
  }
`;
