import gql from 'graphql-tag';

export const QUERY_CURRENT_USER = gql`
  query currentUser {
    currentUser @client
  }
`;
