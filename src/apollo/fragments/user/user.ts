import { gql } from '@apollo/client';

export const FRAGMENT_USER = gql`
  fragment UserFragmentFields on User {
    id
    firstName
    lastName
    email
    phone
    gender
    accounts {
      id
      balance
      currency
      default
    }
  }
`;
