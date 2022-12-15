import { StyleSheet, Button, View } from "react-native";
import axios from "axios";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    <View style={styles.container}>
      <Button
        title="Set an Alarm"
        onPress={() => navigation.navigate("Alarm")}
      />
      <Button
        title="Go to your motivational video today!"
        onPress={() => navigation.navigate("Video Screen")}
      />
      <Button
        title="Go to your motivational quote today!"
        onPress={() => navigation.navigate("Quotes Screen")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
