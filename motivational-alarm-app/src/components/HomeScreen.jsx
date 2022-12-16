import {
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyButton from "./MyButton";


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
      const urls = [
        "https://www.youtube.com/embed/RIYOO2-G22U",
        "https://www.youtube.com/embed/SZZ59M8ZUMI",
        "https://www.youtube.com/embed/kzYx9cxB6gs",
        "https://www.youtube.com/embed/IzMLoImoJQI",
        "https://www.youtube.com/embed/w6KhkbcMC6w",
        "https://www.youtube.com/embed/WQ2arZr1zyM",
      ];
      for (var i = 0; i < 6; i++) {
        addVideo(i, urls[i]);
      }
      await AsyncStorage.setItem("isFirst", "false");
      await AsyncStorage.setItem("videoIdx", "0");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/Images/background2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <MyButton
            buttonTitle="Set an Alarm"
            actionOnPress={() => navigation.navigate("Alarm")}
            buttonColor={"#001b36"}
          />
          <MyButton
            buttonTitle="Go to your motivational video today!"
            actionOnPress={() => navigation.navigate("Video Screen")}
            buttonColor={"#001b36"}
          />
          <MyButton
            buttonTitle="Go to your motivational quotes"
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 25,
    color: "#001b36",
    fontWeight: "bold",
    padding: 6,
    margin: 5,
    marginBottom: 80,
  },
});
