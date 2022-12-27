import { SafeAreaView, StyleSheet, View, ImageBackground } from "react-native";
import axios from "axios";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyButton from "./MyButton";
import { Text } from "react-native";

export default function HomeScreen({ navigation }) {
  const addVideo = async (id, path) => {
    const response = await axios.post(
      `https://motivational-alarm-app.herokuapp.com/api/addVideo`,
      {
        id: id,
        path: path,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("Path of video from database: " + response.data.path);
  };

  const init = async () => {
    const isFirst = await AsyncStorage.getItem("isFirst");
    // console.log("is first time to build database? "+isFirst);
    if (isFirst === null || isFirst === "null") {
      await AsyncStorage.setItem("isFirst", "false");
      await AsyncStorage.setItem("videoIdx", "0");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/Images/background2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <Text style={styles.textStyle}>Welcome to the Motivational Alarm App</Text>
        </View>
        <View style={styles.container}>
          <MyButton
            buttonTitle="Set an Alarm for motivational video."
            actionOnPress={() => navigation.navigate("Alarm")}
            buttonColor={"#001b36"}
          />
          <MyButton
            buttonTitle="Go to a motivational video."
            actionOnPress={() => navigation.navigate("Video Screen")}
            buttonColor={"#001b36"}
          />
          <MyButton
            buttonTitle="Go to motivational quotes."
            actionOnPress={() => navigation.navigate("Quotes Screen")}
            buttonColor={"#001b36"}
          />
          <MyButton
            buttonTitle="Go to your favorite motivational quotes"
            actionOnPress={() => navigation.navigate("Fav Quotes Screen")}
            buttonColor={"#001b36"}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  textStyle: {
    textAlign: "center",
    fontSize: 30,
    color: "#001b36",
    fontWeight: "bold",
    padding: 30,
    marginTop: 20,
  },
});
