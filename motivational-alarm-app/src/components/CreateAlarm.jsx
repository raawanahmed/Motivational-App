import React from "react";
import { StyleSheet, View } from "react-native";
import TimePicker from "./TimePicker";
import ListAlarms from "./ListAlarms";
import { SafeAreaView, ImageBackground } from "react-native";
export default function CreateAlarm() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/Images/background2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <ListAlarms />
          <TimePicker />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width:"100%"
  },
});
