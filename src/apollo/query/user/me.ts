import { gql } from "@apollo/client";

import { FRAGMENT_USER } from "../../fragments";

export const QUERY_ME = gql`
  ${FRAGMENT_USER}
  query me {
    me {
      ...UserFragmentFields
    }
  }
`;
