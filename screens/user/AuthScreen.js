import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/colors";
import * as authActions from "../../store/actions/auth";

// --- FOR THE TIME, HERE LOGIN BUTTON IS PERFORMING SIGNUP FUNCTIONALITY

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


const AuthScreen = (props) => {
  const dispatch = useDispatch();

  // initializing formReducer with some initial values we are passing as object
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const signupHandler = async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "please check the errors in the form", [
        { text: "Okay" },
      ]);
      return;
    }

    await dispatch(
      authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
  };

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      // behavior="padding"
      // keyboardVerticalOffset={-200}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3f0"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initializeValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initializeValue=""
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                color={Colors.primary}
                onPress={signupHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Switch to Sign Up"
                color={Colors.accent}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Authenticate",
  };
};

export default AuthScreen;
