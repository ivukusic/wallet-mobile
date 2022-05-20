import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "~/screens/auth/LoginScreen";
import CurrencyScreen from "~/screens/auth/CurrencyScreen";
import DashboardScreen from "~/screens/dashboard/DashboardScreen";
import SendScreen from "~/screens/dashboard/SendScreen";

import { RootStackParamList, SCREENS } from "../../common/types";
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
      initialRouteName={initialRouteName}
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Group screenOptions={{ headerShown: false }}>
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
      </Stack.Group>

      <Stack.Group screenOptions={{ headerShown: true }}>
        <Stack.Screen name={SCREENS.Dashboard} component={DashboardScreen} />
      </Stack.Group>

      <Stack.Group screenOptions={{ headerShown: true, presentation: "modal" }}>
        <Stack.Screen name={SCREENS.Send} component={SendScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export const Navigation = () => (
  <NavigationContainer ref={navigationRef}>
    <RootNavigator />
  </NavigationContainer>
);
