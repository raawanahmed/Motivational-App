import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";


export default function VideoScreen() 
{

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
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/Images/background2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.headerTitle}>
            Here is your motivational video today.
          </Text>
          {
            videoPath != null ? (
              <WebView
                scalesPageToFit={true}
                bounces={false}
                javaScriptEnabled
                style={styles.webFrame}
                source={{
                  html: `
                <!DOCTYPE html>
                <html>
                  <head>
                  </head> 
                  <body>
                    
                      <iframe width="100%" height="700" src=${videoPath} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  
                  </body>
                </html>`,
                }}
                automaticallyAdjustContentInsets={false}
              />
            ) : (<Text style={styles.textStyle}> Loading...</Text>)
          }

        </View>
      </ImageBackground>

    </SafeAreaView>
  );
}

let deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  webFrame: {
    width: deviceWidth,
    flex: 1,
    backgroundColor: 'transparent',
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
