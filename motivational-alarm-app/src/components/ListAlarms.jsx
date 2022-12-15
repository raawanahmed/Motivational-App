import { StyleSheet, FlatList, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import MyButton from "./MyButton";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DELETE_ALARM, SET_ALARMS } from "../redux/actions/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ListAlarms() {
  const dispatch = useDispatch();
  const { alarms } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const onDeleteButton = (item) => {
    // to do add alert before deleting
    console.log(item);
    dispatch({
      type: DELETE_ALARM,
      payload: {
        id: item.id,
        time: item.time,
        date: item.date,
        notificationId: item.notificationId,
      },
    });
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
            onDeleteButton(item);
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
      dispatch({
        type: SET_ALARMS,
        payload: {
          alarms: storageAlarms,
        },
      });
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
