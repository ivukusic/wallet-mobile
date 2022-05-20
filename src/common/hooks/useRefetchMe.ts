import { useQuery } from '@apollo/client';

import client from '~/apollo/client';
import { QUERY_ME } from '~/apollo/query';
import { IUserType } from '~/types';

export const useRefetchMe = () => {
  const onCompleted = (data: { me: IUserType }) => {
    client.updateLocalStateCurrentUser(data.me);
  };

  const { data, refetch } = useQuery(QUERY_ME, {
    fetchPolicy: 'cache-only',
    nextFetchPolicy: 'network-only',
    onCompleted,
  });

  return { me: data?.me, refetch };
};

export default useRefetchMe;
