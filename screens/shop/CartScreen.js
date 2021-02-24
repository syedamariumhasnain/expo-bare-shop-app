import React, { useState, useEffect } from "react";
import { View, FlatList, Platform, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../../components/UI/Card";
import BodyText from "../../components/UI/BodyText";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Colors from "../../constants/colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [
        {
          text: "Okay",
          onPress: () => {
            props.navigation.goBack();
          },
        },
      ]);
    }
  }, [error]);

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <BodyText style={styles.summaryText}>
          Total:{" "}
          <BodyText style={styles.amount}>
            {/* Due to deleting cart products (continious reduction) javascript makes negative value in point, So to avoid that minus sign in our cart total we use this formula */}
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </BodyText>
        </BodyText>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum.toFixed(2)}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Your Cart",
  };
};

export default CartScreen;
