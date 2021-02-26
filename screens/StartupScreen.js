import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getItem } from "../services/localStorage";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import * as authActions from "../store/actions/auth";

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => { 
      // try{
        const userData = await getItem("userData");
      // } catch (err) {
      //   console.log(err.message);
      //   dispatch(authActions.setDidTryAL);
      // }

      if(!userData) {
        // props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAL);
        return;
      }
      // const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = userData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAL);
        return;
      }

      // props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token));
    }

    tryLogin();

  }, [dispatch]);

  return <LoadingSpinner />;
}

export default StartupScreen;
// async loginHandler (){
//   localStorageSetItem(ACCESS_TOKEN, response.accessToken);
//   var token = await localStorageGetItem(ACCESS_TOKEN);
// }
