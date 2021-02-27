import React from "react";
import { View, SafeAreaView, Button } from "react-native";
import { useDispatch } from "react-redux";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import * as authActions from "../../store/actions/auth";
import Colors from "../../constants/colors";

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, marginTop: 25 }}>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        {/* <DrawerContentScrollView {...props}> */}
        <DrawerItemList {...props} />
        <Button
          title="Logout"
          color={Colors.primary}
          onPress={() => {
            dispatch(authActions.logout());
          }}
        />
        {/* </DrawerContentScrollView> */}
      </SafeAreaView>
    </View>
  );
};

export default CustomDrawer;
