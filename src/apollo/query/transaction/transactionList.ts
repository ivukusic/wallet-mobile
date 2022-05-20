import { gql } from "@apollo/client";

import { FRAGMENT_TRANSACTION, FRAGMENT_USER } from "../../fragments";

export const QUERY_TRANSACTION_LIST = gql`
  ${FRAGMENT_TRANSACTION}
  query transactionList($where: TransactionWhere, $pagination: PaginationArgs) {
    transactionList(where: $where, pagination: $pagination) {
      data {
        ...TransactionFragmentFields
        sender {
          id
          firstName
          lastName
          accounts {
            id
            currency
          }
        }
        receiver {
          id
          firstName
          lastName
          accounts {
            id
            currency
          }
        }
      }
      count
    }
  }
`;
