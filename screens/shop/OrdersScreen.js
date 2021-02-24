import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Button, Text, Platform, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as OrdersActions from "../../store/actions/orders";
import BodyText from "../../components/UI/BodyText";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/colors";

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  // async function to load resources & error handling through try catch
  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(OrdersActions.fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  // when ever screen get focus, again call async function to load resources
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadOrders);
    return () => {
      unsubscribe();
    };
  }, [dispatch, loadOrders]);

  // call async function to load resources on initial loading of app 
  useEffect(() => {
    loadOrders();
  }, [dispatch, loadOrders]);

  if (error) {
    return (
      <View style={styles.centered}>
        <BodyText>An error occured!</BodyText>
        <Button
          title="Try again"
          color={Colors.primary}
          onPress={loadOrders}
        />
      </View>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <BodyText>No orders found. Maybe start adding some!</BodyText>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default OrdersScreen;
