import { goTo } from "~/navigation/root/utils";
import { SCREENS } from "~/types";

const useHook = () => {
  const handleLogin = async () => {
    goTo(SCREENS.Currency);
  };

  return { handleLogin };
};

export default useHook;
