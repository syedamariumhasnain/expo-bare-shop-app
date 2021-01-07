import React, { useState } from 'react';
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <View>
      <StatusBar style="auto" />
    </View>
  );
}


// import React, { useState } from "react";
// import * as Font from "expo-font";
// import { AppLoading } from "expo";
// import { enableScreens } from "react-native-screens";
// import { createStore, combineReducers } from "redux";
// import { Provider } from "react-redux";

// import MealsNavigator from "./navigation/MealsNavigator";
// import mealsReducer from "./store/reducers/meals";

// enableScreens();

// const rootReducer = combineReducers({
//   meals: mealsReducer,
// });

// const store = createStore(rootReducer);

// const fetchFonts = () => {
//   return Font.loadAsync({
//     "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
//     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
//   });
// };

// export default function App() {
//   const [dataLoaded, setDataLoaded] = useState(false);

//   if (!dataLoaded) {
//     return (
//       <AppLoading
//         startAsync={fetchFonts}
//         onFinish={() => setDataLoaded(true)}
//         onError={(err) => console.log(err)}
//       />
//     );
//   }

//   return (
//     <Provider store={store}>
//       <MealsNavigator />
//     </Provider>
//   );
// }
