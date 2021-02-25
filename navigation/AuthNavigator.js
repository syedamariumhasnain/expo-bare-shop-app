import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Platform } from "react-native";

import AuthScreen, {
  screenOptions as AuthOptions,
} from "../screens/user/AuthScreen";

import Colors from "../constants/colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const AuthNavigator = createStackNavigator();
const AuthStackNavigator = (props) => {
  return (
    <AuthNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <AuthNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={AuthOptions}
      />
    </AuthNavigator.Navigator>
  );
};

export default AuthStackNavigator;