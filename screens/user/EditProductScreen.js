import React, { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Platform,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import BodyText from "../../components/UI/BodyText";

// This screen/code will perform conditional displaying for ADD and EDIT:
// if, get productId prop along with navigation, means EDIT
// other wise it should work for ADD
// because EDIT is navigated here with productId prop but ADD don't

const EditProductScreen = (props) => {
  const prodId = props.route.params.productId;
  const editProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const [title, setTitle] = useState(editProduct ? editProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editProduct ? editProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editProduct ? editProduct.description : ""
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <BodyText style={styles.label}>Title</BodyText>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <BodyText style={styles.label}>Image URL</BodyText>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editProduct ? null : (
          <View style={styles.formControl}>
            <BodyText style={styles.label}>Price</BodyText>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <BodyText style={styles.label}>Description</BodyText>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.productId
      ? "Edit Product"
      : "Add Product",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={() => {}}
          />
        </HeaderButtons>
      );
    },
  };
};

export default EditProductScreen;
