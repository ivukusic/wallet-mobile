import { gql } from '@apollo/client';

import { FRAGMENT_TRANSACTION } from '~/apollo/fragments';

export const MUTATION_TRANSACTION_CREATE = gql`
  ${FRAGMENT_TRANSACTION}
  mutation transactionCreate($data: TransactionCreateInput!) {
    transactionCreate(data: $data) {
      ...TransactionFragmentFields
    }
  }
`;
