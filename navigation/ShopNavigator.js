import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Platform } from "react-native";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
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

const ProductsNavigator = createStackNavigator();
const ProductsStackNavigator = (props) => {
  return (
    <ProductsNavigator.Navigator>
      <ProductsNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={defaultStackNavOptions}
      />
    </ProductsNavigator.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <ProductsStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;