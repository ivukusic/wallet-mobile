import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "~/screens/auth/LoginScreen";
import CurrencyScreen from "~/screens/auth/CurrencyScreen";
import DashboardScreen from "~/screens/dashboard/DashboardScreen";

import { RootStackParamList, SCREENS } from "../../common/types";
import { navigationRef } from "./utils";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={SCREENS.Login}
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.Currency}
      component={CurrencyScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.Dashboard}
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const Navigation = () => (
  <NavigationContainer ref={navigationRef}>
    <RootNavigator />
  </NavigationContainer>
);
