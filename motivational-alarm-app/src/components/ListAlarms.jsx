import { Button, StyleSheet, FlatList, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem } from "react-native-elements";
import MyButton from "./MyButton";
import { SafeAreaView } from "react-native";

export default function ListAlarms({ AlarmsList }) {
  const [Alarms, setAlarms] = React.useState(AlarmsList);
  const onDeleteButton = () => {};

  const renderItem = ({ item }) => {
    //  console.log(item);

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
            onDeleteButton(item.id);
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style = {{flex: 1}}>
      <Text style={styles.titleStyle}>Motivational Alarm</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={Alarms}
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
