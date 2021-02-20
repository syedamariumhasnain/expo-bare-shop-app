import React from "react";
import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BodyText from "../../components/UI/BodyText";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={{ ...styles.itemData, width: "60%" }}>
        <BodyText style={styles.quantity}>{props.quantity} </BodyText>
        <BodyText style={styles.mainText} numberOfLines={1} >{props.title}</BodyText>
      </View>
      <View style={styles.itemData}>
        <BodyText style={styles.mainText}>${props.amount}</BodyText>
        {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: "#888",
  },
  mainText: {
    fontFamily: "open-sans-bold",
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
