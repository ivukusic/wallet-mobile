import { createNavigationContainerRef } from "@react-navigation/native";

import { RootStackParamList } from "~/types";

export const navigationRef = createNavigationContainerRef();

export const goTo = <T extends keyof RootStackParamList>(
  path: T,
  params?: RootStackParamList[T]
) => {
  if (path) {
    //@ts-expect-error
    return navigationRef?.current?.navigate(path, params);
  }
};
