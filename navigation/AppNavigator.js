import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import AuthStackNavigator from "./AuthNavigator";
import MainDrawerNavigator from "./ShopNavigator";
import StartupScreen from "../screens/StartupScreen";

const AppNavigator = (props) => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <MainDrawerNavigator />}
      {!isAuth && didTryAutoLogin && <AuthStackNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
