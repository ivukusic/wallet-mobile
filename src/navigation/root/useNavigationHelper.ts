import { useCallback, useEffect, useState } from "react";

import { useQuery } from "@apollo/client";

import { STORAGE } from "~/constants/storage";
import { SCREENS } from "~/types";

import { storage } from "../../common/utils/storage";
import { QUERY_CURRENT_USER } from "../../apollo/query";

export const useNavigationHelper = (): {
  initialRouteName:
    | SCREENS.Login
    | SCREENS.Currency
    | SCREENS.Dashboard
    | undefined;
} => {
  const [initialRouteName, setInitialRouteName] = useState<
    SCREENS.Login | SCREENS.Currency | SCREENS.Dashboard | undefined
  >();

  const { data, loading } = useQuery(QUERY_CURRENT_USER);

  const getInitialRouteName = useCallback(async () => {
    let currentUser = await storage.get.item(STORAGE.CURRENT_USER);

    let route = SCREENS.Login;
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      if (currentUser.id) {
        // setMeStep("fetch");

        if (currentUser.accounts?.length) {
          route = SCREENS.Dashboard;
        } else {
          route = SCREENS.Currency;
        }
      }
    }

    setInitialRouteName(route);
  }, []);

  useEffect(() => {
    if (!loading && data) {
      getInitialRouteName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  return { initialRouteName };
};
