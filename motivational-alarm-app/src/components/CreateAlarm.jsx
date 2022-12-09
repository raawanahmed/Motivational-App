import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Audio } from "expo-av";
import TimePicker from "./TimePicker";
import ListAlarms from "./ListAlarms";
import MyButton from "./MyButton";
import { SafeAreaView } from "react-native";
export default function CreateAlarm() {
  const [sound, setSound] = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/yaSabahElro3b.wav")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const stopSound = async () => {
    await sound.stopAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
