import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SCREENS } from "./screen";

export type RootStackParamList = {
  [SCREENS.Login]: undefined;
  [SCREENS.Currency]: undefined;
  [SCREENS.Dashboard]: undefined;
};

export type RouterNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
