import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthStackNavigator from "./AuthNavigator";
import MainDrawerNavigator from "./ShopNavigator";

const AppNavigator = (props) => {
  let [isAuth, setIsAuth] = useState(false);

  const authChangeHandler = () => {
    setIsAuth(!isAuth);
  }
  return (
    <NavigationContainer>
      {!isAuth && <AuthStackNavigator />}
      {isAuth && <MainDrawerNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
