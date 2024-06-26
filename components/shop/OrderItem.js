import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import Card from "../UI/Card";
import BodyText from "../UI/BodyText";
import TitleText from "../UI/TitleText";
import Colors from "../../constants/colors";

import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <TitleText style={styles.totalAmount}>
          ${props.amount.toFixed(2)}
        </TitleText>
        <BodyText style={styles.date}>{props.date}</BodyText>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide Detail" : "Show Detail"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
