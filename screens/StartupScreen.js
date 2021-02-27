import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setItem, removeItem, getItem } from "../services/localStorage";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import * as authActions from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  console.log("Startup Screen");
  // removeItem("userData");
  // console.log(getItem("userData"));

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await getItem("userData");
      console.log("userData fetched from device");
      console.log(userData);

      if (!userData) {
        console.log("caught by (!userData)");
        dispatch(authActions.setDidTryAL());
        console.log("Done authActions.setDidTryAL")
        return;
      }
      // const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = userData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        console.log("caught by (expirationDate <= new Date() || !token || !userId)");
        dispatch(authActions.setDidTryAL());
        return;
      }

      // .getTime() returns date in milliseconds
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      // console.log("dispatching auto login authentication");
      dispatch(authActions.authenticate(userId, token, expirationTime));
      // console.log("dispatched auto login authentication");
    };

    tryLogin();
  }, [dispatch]);

  return <LoadingSpinner />;
};

export default StartupScreen;
