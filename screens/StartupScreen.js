import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItem } from "../services/localStorage";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import * as authActions from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  console.log("Startup Screen");

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await getItem("userData");
      console.log("userData fetched from device");
      console.log(userData);

      if (!userData) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      // const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = userData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(authActions.setDidTryAL());
        return;
      }

      // .getTime() returns date in milliseconds
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return <LoadingSpinner />;
};

export default StartupScreen;
