import React from "react";
import { View, FlatList, Platform, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import BodyText from "../../components/UI/BodyText";
import Colors from "../../constants/colors";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <BodyText style={styles.summaryText}>
          Total:{" "}
          <BodyText style={styles.amount}>
            ${cartTotalAmount.toFixed(2)}
          </BodyText>
        </BodyText>
        <Button color={Colors.accent} title="Order Now" disabled={cartItems.length === 0} />
      </View>
      <View>
        <BodyText>CART ITEMS</BodyText>
      </View>
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
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
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
}

export default CartScreen;
