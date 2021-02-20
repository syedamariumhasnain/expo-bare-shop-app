import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen, {
  screenOptions as ProductsOverviewOptions,
} from "../screens/shop/ProductsOverviewScreen";
import CartScreen, {
  screenOptions as CartOptions,
} from "../screens/shop/CartScreen";
import ProductDetailScreen, {
  screenOptions as ProductDetailOptions,
} from "../screens/shop/ProductDetailScreen";
import OrdersScreen, {
  screenOptions as OrdersOptions,
} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
  screenOptions as UserProductsOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as EditProductOptions,
} from "../screens/user/EditProductScreen";

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

const OrdersNavigator = createStackNavigator();
const OrdersStackNavigator = (props) => {
  return (
    <OrdersNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <OrdersNavigator.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={OrdersOptions}
      />
    </OrdersNavigator.Navigator>
  );
};

const UserProductsNavigator = createStackNavigator();
const UserProductsStackNavigator = (props) => {
  return (
    <UserProductsNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <UserProductsNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={UserProductsOptions}
      />
      <UserProductsNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={EditProductOptions}
      />
    </UserProductsNavigator.Navigator>
  );
};

const MainNavigator = createDrawerNavigator();
const MainDrawerNavigator = (props) => {
  return (
    <MainNavigator.Navigator
      // drawerStyle={{
      //   backgroundColor: Colors.dull,
      // }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        activeBackgroundColor: "transparent",
        labelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      <MainNavigator.Screen
        name="Products"
        component={ProductsStackNavigator}
        options={{
          drawerLabel: "Products",
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Orders"
        component={OrdersStackNavigator}
        options={{
          drawerLabel: "Orders",
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Admin"
        component={UserProductsStackNavigator}
        options={{
          drawerLabel: "Admin",
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </MainNavigator.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <MainDrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
