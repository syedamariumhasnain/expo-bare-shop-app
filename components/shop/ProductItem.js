import React from "react";
import { View, Image, Button, StyleSheet } from "react-native";

import BodyText from "../main/BodyText";
import Colors from "../../constants/colors";

const ProductItem = (props) => {
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: props.image}}/>
      </View>
      <View style={styles.detail}>
        <BodyText style={styles.title}>{props.title}</BodyText>
        <BodyText style={styles.price}>${props.price.toFixed(2)}</BodyText>
      </View>
      <View style={styles.buttonContainer}>
        <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail}/>
        <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detail: {
    paddingHorizontal: 10,
    alignItems: "center",
    height: "15%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    height: "25%",
  },
});

export default ProductItem;