import { StyleSheet, Text, View, Button } from "react-native";
import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
export default function VideoScreen({ navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        Here is your motivational video today.
      </Text>
      <Video
        ref={video}
        style={styles.video}
        source={require("../../assets/videos/video2.mp4")}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
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
