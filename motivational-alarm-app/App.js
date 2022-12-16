import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/components/HomeScreen";
import VideoScreen from "./src/components/VideoScreen";
import QuotesScreen from "./src/components/QuotesScreen";
import CreateAlarm from "./src/components/CreateAlarm";
import FavQuotesScreen from "./src/components/FavQuotesScreen";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { ImageBackground, StatusBar } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
//const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerTitleContainerStyle: {
              justifyContent: "center",
              alignItems: "center",
            },
            headerStyle: {
              backgroundColor: "white",
              borderBottomLeftRadius: 300,
              borderBottomRightRadius: 300,
              height: 70,
            },

            headerTransparent: "true",
            headerTitle: "",
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Alarm" component={CreateAlarm} />
          <Stack.Screen name="Video Screen" component={VideoScreen} />
          <Stack.Screen name="Quotes Screen" component={QuotesScreen} />
          <Stack.Screen name="Fav Quotes Screen" component={FavQuotesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </Provider>
  );
}
