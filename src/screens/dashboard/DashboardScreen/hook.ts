import client from '~/apollo/client';
import { goTo, reset } from '~/navigation/root/utils';
import { SCREENS } from '~/types';

const useHook = () => {
  const handleLogout = async () => {
    await client.logout();
    reset(SCREENS.Login);
  };

  const handleSend = () => {
    goTo(SCREENS.Send);
  };

  return { handleLogout, handleSend };
};

export default useHook;
