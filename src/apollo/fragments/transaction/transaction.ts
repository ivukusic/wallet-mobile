import { gql } from '@apollo/client';

export const FRAGMENT_TRANSACTION = gql`
  fragment TransactionFragmentFields on Transaction {
    id
    amount
    currency
    exchangeRate
    createdAt
  }
`;
