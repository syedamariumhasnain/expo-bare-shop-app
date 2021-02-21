import React, { useEffect, useCallback, useReducer } from "react";
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
import Input from "../../components/UI/Input";
import * as productsAction from "../../store/actions/products";

// This screen/code will perform conditional displaying for ADD and EDIT:
// if, get productId prop along with navigation, means EDIT
// other wise it should work for ADD
// because EDIT is navigated here with productId prop but ADD don't

// created action named FORM_INPUT_UPDATE
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// created reducer named formReducer
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updateValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updateValues,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const prodId = props.route.params.productId;
  const editProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  // const [title, setTitle] = useState(editProduct ? editProduct.title : "");
  // const [titleIsValid, setTitleIsValid] = useState(false);
  // const [imageUrl, setImageUrl] = useState(
  //   editProduct ? editProduct.imageUrl : ""
  // );
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState(
  //   editProduct ? editProduct.description : ""
  // );

  const dispatch = useDispatch();

  // initializing formReducer with some initial values we are passing as object
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editProduct ? editProduct.title : "",
      imageUrl: editProduct ? editProduct.imageUrl : "",
      description: editProduct ? editProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editProduct ? true : false,
      imageUrl: editProduct ? true : false,
      description: editProduct ? true : false,
      price: editProduct ? true : false,
    },
    formIsValid: editProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "please check the errors in the form", [
        { text: "Okay" },
      ]);
      return;
    }
    if (editProduct) {
      dispatch(
        productsAction.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      // to convert price from "string" to "number", we write +price
      dispatch(
        productsAction.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

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

  // dispatching action for FORM_INPUT_UPDATE along with data we want to use in reducer
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          // to avoiid inputChangeHandler.bind(this, 'title') we are passing title in 'id' prop, avoiding infinite loop issue.
          id="title"
          label="Title"
          errorText="Please enter a valid title!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editProduct ? editProduct.title : ""}
          initiallyValid={!!editProduct}
          required
        />
        <Input
          id="imageUrl"
          label="Image URL"
          errorText="Please enter a valid image url!"
          keyboardType="default"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editProduct ? editProduct.imageUrl : ""}
          initiallyValid={!!editProduct}
          required
        />
        {editProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            // initialValue={editProduct ? editProduct.price : ""}
            // initiallyValid={!!editProduct}
            required
            min={0.1}
          />
        )}
        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid description!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editProduct ? editProduct.description : ""}
          initiallyValid={!!editProduct}
          required
          minLength={5}
        />
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
