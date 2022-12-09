import { StyleSheet, FlatList, View, Text } from "react-native";
import React from "react";
import MyButton from "./MyButton";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DELETE_ALARM } from "../redux/actions/types";
export default function ListAlarms() {
  const dispatch = useDispatch();
  const { alarms } = useSelector((state) => state);
  const onDeleteButton = (item) => {
    console.log(item);
    dispatch({
      type: DELETE_ALARM,
      payload: { id: item.id, time: item.time, date: item.date },
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.titleStyle}>Motivational Alarm</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={alarms}
        renderItem={renderItem}
      />
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
