import { gql } from '@apollo/client';

import { FRAGMENT_USER } from '../../fragments';

export const MUTATION_AUTH_SIGNUP = gql`
  ${FRAGMENT_USER}
  mutation authSignup($data: AuthSignupInput!) {
    authSignup(data: $data) {
      accessToken
      refreshToken
      user {
        ...UserFragmentFields
      }
    }
  }
`;
