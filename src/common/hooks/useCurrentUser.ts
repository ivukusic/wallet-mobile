import { useQuery } from '@apollo/client';

import { QUERY_CURRENT_USER } from '~/apollo/query';
import { IUserType } from '~/types';

export const useCurrentUser = (): {
  currentUser: IUserType;
  loading: boolean;
} => {
  const { data, loading } = useQuery(QUERY_CURRENT_USER);
  const currentUser: IUserType = data?.currentUser || {};

  return { currentUser, loading };
};

export default useCurrentUser;
