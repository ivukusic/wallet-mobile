import {
  CommonActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

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

export const goBack = () => {
  return navigationRef?.current?.goBack();
};

export const reset = <T extends keyof RootStackParamList>(path: T) => {
  if (path) {
    return navigationRef?.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: path }],
      })
    );
  }
};
