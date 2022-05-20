import { useQuery } from '@apollo/client';

import { QUERY_ME } from '~/apollo/query';

export const useRefetchMe = () => {
  const { data, refetch } = useQuery(QUERY_ME, {
    fetchPolicy: 'cache-only',
    nextFetchPolicy: 'network-only',
  });

  return { me: data?.me, refetch };
};

export default useRefetchMe;
