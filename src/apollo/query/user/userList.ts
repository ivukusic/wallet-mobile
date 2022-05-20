import { gql } from '@apollo/client';

import { FRAGMENT_USER } from '../../fragments';

export const QUERY_USER_LIST = gql`
  ${FRAGMENT_USER}
  query userList {
    userList {
      ...UserFragmentFields
    }
  }
`;
