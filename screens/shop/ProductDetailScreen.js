import React from "react";
import {
  ScrollView,
  View,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

import BodyText from "../../components/main/BodyText";
import Colors from "../../constants/colors";

const ProductDetailScreen = (props) => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
      <View style={styles.buttonContainer}>
        <Button color={Colors.primary} title="Add To Cart" onPress={() => {}}/>
      </View>
      <BodyText style={styles.price}>${selectedProduct.price}</BodyText>
      <BodyText style={styles.description}>{selectedProduct.description}</BodyText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.productTitle,
  };
};

export default ProductDetailScreen;
