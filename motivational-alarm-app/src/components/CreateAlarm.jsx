import React from "react";
import { StyleSheet, View } from "react-native";
import TimePicker from "./TimePicker";
import ListAlarms from "./ListAlarms";
import { SafeAreaView } from "react-native";
export default function CreateAlarm() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ListAlarms />
        <TimePicker />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
