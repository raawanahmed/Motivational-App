import { StyleSheet, Text, View} from "react-native";
import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";
export default function VideoScreen() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [videoPath, setVideoPath] = useState(null);
  const getVideo = async () => {
    let idx = await AsyncStorage.getItem("videoIdx");
    idx = +idx;
    idx %= 6;
    await AsyncStorage.setItem("videoIdx", `${(idx + 1) % 6}`);
    const res = await axios.post(
      `https://motivational-alarm-app.herokuapp.com/api/getVideo/${idx}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data.path);
    setVideoPath(res.data.path);
  };

  useEffect(() => {
    getVideo();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        Here is your motivational video today.
      </Text>
      {/* {videoPath != null ? (
        <Video
          ref={video}
          style={styles.video}
          source={require("../../assets/videos/video2.mp4")}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      ) : (
        <Text> Loading...</Text>
      )} */}
      <WebView
        scalesPageToFit={true}
        bounces={false}
        javaScriptEnabled
        style={{ height: 500, width: 300, flex: 1 }}
        source={{
          html: `
                <!DOCTYPE html>
                <html>
                  <head></head> 
                  <body>
                    <div id="baseDiv"><iframe width="100%" height="900" src=${videoPath} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div> //<--- add your iframe here
                  </body>
                </html>
          `,
        }}
        automaticallyAdjustContentInsets={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  textStyle: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
  },
});
