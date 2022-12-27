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

export default function Video({videoPath}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Motivational video</Text>
      {videoPath != null ? (
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
      ) : (
        <Text style={styles.textStyle}> Loading...</Text>
      )}
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
