import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/components/HomeScreen";
import VideoScreen from "./src/components/VideoScreen";
import QuotesScreen from "./src/components/QuotesScreen";
import CreateAlarm from "./src/components/CreateAlarm";
import { Provider } from "react-redux";
import store from "./src/redux/store";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Alarm" component={CreateAlarm} />
          <Stack.Screen name="Video Screen" component={VideoScreen} />
          <Stack.Screen name="Quotes Screen" component={QuotesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
