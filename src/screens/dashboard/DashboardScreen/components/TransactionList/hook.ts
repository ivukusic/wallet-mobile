import { useEffect, useMemo, useState } from 'react';

import { useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';

import { QUERY_TRANSACTION_LIST } from '~/apollo/query';
import useCurrentUser from '~/hooks/useCurrentUser';
import useRefetchMe from '~/hooks/useRefetchMe';
import { IAnyType, IPaginatedType, ITransactionType, RouterNavigationProp } from '~/types';

import { ScreenRouteProp } from './types';

const LIMIT = 2;

const useHook = () => {
  const { currentUser } = useCurrentUser();
  const { refetch: refetchMe } = useRefetchMe();

  const navigation: RouterNavigationProp = useNavigation();
  const route: ScreenRouteProp = useRoute();

  const { reset } = route.params || {};

  const [filter, setFilter] = useState('All');
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [transactionData, setTransactionData] = useState<
    IPaginatedType<ITransactionType> | undefined
  >(undefined);

  const variables: IAnyType = useMemo(() => {
    const pagination = {
      limit: LIMIT,
      offset: 0,
    };
    if (!currentUser.id) {
      return { pagination };
    }
    if (filter === 'Sent') {
      return {
        pagination,
        where: {
          or: [{ sender: { id: currentUser.id } }],
        },
      };
    }
    if (filter === 'Received') {
      return {
        pagination: pagination,
        where: {
          or: [{ receiver: { id: currentUser.id } }],
        },
      };
    }
    return {
      pagination: pagination,
      where: {
        or: [{ receiver: { id: currentUser.id } }, { sender: { id: currentUser.id } }],
      },
    };
  }, [currentUser.id, filter]);

  const onCompleted = (data: { transactionList: IPaginatedType<ITransactionType> }) => {
    setTransactionData((prevState: IPaginatedType<ITransactionType> | undefined) => {
      return {
        count: data.transactionList.count,
        data: [...(prevState?.data || []), ...data.transactionList.data],
      };
    });
  };

  const { refetch } = useQuery(QUERY_TRANSACTION_LIST, {
    onCompleted,
    variables,
  });

  useEffect(() => {
    if (reset) {
      setTransactionData(undefined);
      navigation.setParams({ reset: undefined });
      refetch(variables);
      refetchMe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  useEffect(() => {
    refetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transactions = useMemo(() => {
    if (transactionData?.data) {
      return transactionData?.data;
    }
    return [];
  }, [transactionData]);

  const handleLoadMore = async () => {
    return refetch({
      pagination: {
        ...variables.pagination,
        offset: transactions.length,
      },
      where: { ...(variables.where || {}) },
    });
  };

  const handleFilterPress = (value: string) => () => {
    setFilter(value);
    setTransactionData(undefined);
  };

  const handleShowFilter = () => {
    setShowFilter(prevState => !prevState);
  };

  return {
    currentUser,
    count: transactionData?.count || 0,
    data: transactions,
    filter,
    handleFilterPress,
    handleLoadMore,
    handleShowFilter,
    showFilter,
  };
};

export default useHook;
