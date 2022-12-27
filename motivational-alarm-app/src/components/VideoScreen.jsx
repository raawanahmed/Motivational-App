import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";
import VideoComponent from "./VideoComponent";
export default function VideoScreen() {
  const [videoPath, setVideoPath] = useState(null);

  const getVideo = async () => {
    let idx = await AsyncStorage.getItem("videoIdx");
    idx = +idx; // to convert it to number
    idx %= 6;
    const res = await axios.post(
      `https://motivational-alarm-app.herokuapp.com/api/getVideo/${idx}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(res.data.path);
    setVideoPath(res.data.path);    
    await AsyncStorage.setItem("videoIdx", `${(idx + 1) % 6}`);
  };
  

  useEffect(() => {
    getVideo();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/Images/background2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
       <VideoComponent videoPath={videoPath}></VideoComponent>
      </ImageBackground>
    </View>
  );
}

let deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  webFrame: {
    width: deviceWidth,
    flex: 1,
    backgroundColor: "transparent",
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 25,
    color: "#001b36",
    fontWeight: "bold",
    padding: 6,
    marginBottom: 80,
    marginTop: 50,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    padding: 6,
    margin: 5,
    marginVertical: 100,
  },
});
