import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

import { useLazyQuery, useQuery } from "@apollo/client";

import { IUserType, SCREENS } from "~/types";

import { storage } from "../../common/utils/storage";
import { QUERY_CURRENT_USER } from "../../apollo/query";
import { QUERY_ME } from "../../apollo/query";
import client from "../../apollo/client";
import { STORAGE } from "~/constants/storage";

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
  const [meStep, setMeStep] = useState("");

  const { data, loading } = useQuery(QUERY_CURRENT_USER);

  const onCompleted = async (dataMe: { me: IUserType }) => {
    if (dataMe?.me) {
      client.updateLocalStateCurrentUser(dataMe.me);
    }
  };
  const [fetchMe] = useLazyQuery(QUERY_ME, { onCompleted });

  const getInitialRouteName = useCallback(async () => {
    let currentUser = await storage.get.item(STORAGE.CURRENT_USER);

    let route = SCREENS.Login;
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      if (currentUser.id) {
        setMeStep("fetch");

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

  useEffect(() => {
    if (meStep === "fetch") {
      setMeStep("completed");
      fetchMe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meStep]);

  return { initialRouteName };
};
