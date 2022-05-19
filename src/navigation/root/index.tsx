import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "~/screens/auth/LoginScreen";
import CurrencyScreen from "~/screens/auth/CurrencyScreen";
import DashboardScreen from "~/screens/dashboard/DashboardScreen";

import { IAnyType, RootStackParamList, SCREENS } from "../../common/types";
import { navigationRef } from "./utils";
import { useNavigationHelper } from "./useNavigationHelper";
import { Colors } from "~/themes";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { initialRouteName } = useNavigationHelper();

  if (!initialRouteName) {
    return null;
  }
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName as IAnyType}
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
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
      <Stack.Screen name={SCREENS.Dashboard} component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export const Navigation = () => (
  <NavigationContainer ref={navigationRef}>
    <RootNavigator />
  </NavigationContainer>
);
