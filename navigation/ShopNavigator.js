import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Platform } from "react-native";

import ProductsOverviewScreen, {
  screenOptions as ProductsOverviewOptions,
} from "../screens/shop/ProductsOverviewScreen";
import CartScreen, {
  screenOptions as CartOptions,
} from "../screens/shop/CartScreen";
import ProductDetailScreen, {
  screenOptions as ProductDetailOptions,
} from "../screens/shop/ProductDetailScreen";
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
    <ProductsNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <ProductsNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={ProductsOverviewOptions}
      />
      <ProductsNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={ProductDetailOptions}
      />
      <ProductsNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={CartOptions}
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
