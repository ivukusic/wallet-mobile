import { reset } from "~/navigation/root/utils";

import client from "~/apollo/client";
import { SCREENS } from "~/types";

const useHook = () => {
  const handleLogout = async () => {
    await client.logout();
    reset(SCREENS.Login);
  };

  return { handleLogout };
};

export default useHook;
