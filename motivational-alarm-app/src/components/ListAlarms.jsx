import { StyleSheet, FlatList, View, Text, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import MyButton from "./MyButton";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteAlarm, setLocalStorageOfAlarms } from "../redux/actions/actions";
export default function ListAlarms() {
  const dispatch = useDispatch();
  const alarms = useSelector((state) => state.alarmReducer.alarms);
  const [isLoading, setIsLoading] = useState(false);
  const yesButtonPressed = (item) => {
    console.log("Yes Pressed");
    // console.log("Details of alarm will be deleted: ");
    // console.log(item);
    dispatch(deleteAlarm(item));
  };
  const alertBeforeDeleting = (item) => {
    Alert.alert("Alert!!!", "Do you want to delete this alarm ?", [
      {
        text: "No",
        onPress: () => console.log("No Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => yesButtonPressed(item) },
    ]);
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.alarmStyle}>
        <View style={styles.alarmContent}>
          <Text style={styles.timeStyle}>{item.time}</Text>
          <Text style={styles.dateStyle}>{item.date}</Text>
        </View>
        <MyButton
          buttonTitle="Delete"
          buttonColor="red"
          actionOnPress={() => {
            console.log("Delete button pressed");
            alertBeforeDeleting(item);
          }}
        />
      </View>
    );
  };
  const init = async () => {
    setIsLoading(true);
    let storageAlarms = await AsyncStorage.getItem("alarms");
    if (storageAlarms != null) {
      storageAlarms = JSON.parse(storageAlarms);
      dispatch(setLocalStorageOfAlarms(storageAlarms));
    }
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.titleStyle}>Motivational Alarm</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={alarms}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: "bold",
    fontSize: 25,
    alignContent: "center",
    marginLeft: 15,
  },
  alarmStyle: {
    padding: 15,
    backgroundColor: "white",
    marginVertical: 6,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  alarmContent: {
    alignSelf: "center",
    width: "40%",
  },
  dateStyle: {
    fontWeight: "400",
    color: "gray",
  },
  timeStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
