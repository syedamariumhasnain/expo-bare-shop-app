import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import BodyText from "../../components/UI/BodyText";
import * as productsAction from "../../store/actions/products";

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
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    editProduct ? editProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editProduct ? editProduct.description : ""
  );

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (!titleIsValid) {
      Alert.alert("Wrong Input", "please check the errors in the form", [
        { text: "Okay" },
      ]);
      return;
    }
    if (editProduct) {
      dispatch(
        productsAction.updateProduct(prodId, title, description, imageUrl)
      );
    } else {
      // to convert price from "string" to "number", we write +price
      dispatch(
        productsAction.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price, titleIsValid]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Save"
              iconName={
                Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
              }
              onPress={submitHandler}
            />
          </HeaderButtons>
        );
      },
    });
  }, [submitHandler]);

  const titleChangeHandler = (text) => {
    if (text.trim().length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }
    setTitle(text);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <BodyText style={styles.label}>Title</BodyText>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onEndEditing={() => console.log("onEndEditing")}
            onSubmitEditing={() => console.log("onSubmitEditing")}
          />
        </View>
        {!titleIsValid && <BodyText>Please enter a valid Title</BodyText>}
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
              keyboardType="numeric"
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
  };
};

export default EditProductScreen;
