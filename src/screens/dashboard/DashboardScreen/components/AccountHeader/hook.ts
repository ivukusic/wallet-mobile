import useCurrentUser from '~/hooks/useCurrentUser';

const useHook = () => {
  const { currentUser } = useCurrentUser();

  return { accounts: currentUser.accounts };
};

export default useHook;
