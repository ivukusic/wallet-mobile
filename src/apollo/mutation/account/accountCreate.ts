import { gql } from "@apollo/client";

export const ACCOUNT_CREATE = gql`
  mutation accountCreate($data: AccountCreateInput!) {
    accountCreate(data: $data) {
      id
      balance
      currency
      default
    }
  }
`;
