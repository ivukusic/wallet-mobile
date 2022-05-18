import { goTo } from "~/navigation/root/utils";

import { SCREENS } from "~/types";

const useHook = () => {
  const handleSave = async () => {
    goTo(SCREENS.Dashboard);
  };

  return { handleSave };
};

export default useHook;
