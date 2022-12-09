import React, { useState, useEffect } from "react";
import { View } from "react-native";
import * as Notification from "expo-notifications";
import DateTimePicker from "react-native-modal-datetime-picker";
import MyButton from "./MyButton";
Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      vibrate: false,
    };
  },
});
export default function TimePicker({ AlarmsList }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [alarms, setAlarms] = React.useState(AlarmsList);
  const [selectedDate, setSelectedDate] = useState(null);
  const [numOfID, setID] = React.useState(3);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const onPress = () => {
    console.log("Notification pressed");
  };
  useEffect(() => {
    //When app is closed
    const backgroundSubscription =
      Notification.addNotificationResponseReceivedListener((response) => {});
    //When the app is open
    const foregroundSubscription = Notification.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      // cleanup function
      // remove subscription before component unmounts
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    handleOnAddAlarm();
    // console.log(selectedDate);
    hideDatePicker();
    Notification.scheduleNotificationAsync({
      content: {
        title: "Motivational Reminder Notification",
        body: "See Your Motivational Video for today!",
      },
      trigger: {
        date: date,
      },
    });
  };
  const formatTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var AmPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var time = hours + ":" + minutes + " " + AmPm;
    return time;
  };
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  const handleOnAddAlarm = () => {
    const t = formatTime(selectedDate);
    const d = formatDate(selectedDate);
    console.log(t, d);
    const updatedAlarms = [
      ...alarms,
      {
        id: numOfID,
        time: t,
        date: d,
      },
    ];
    setID(numOfID + 1);
    setAlarms(updatedAlarms);
   // console.log(updatedAlarms);
  };
  return (
    <View>
      <MyButton
        buttonTitle={"Add Alarm"}
        buttonColor={"green"}
        actionOnPress={() => {
          showDatePicker();
          console.log("Add button");
        }}
      />
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        textColor="black"
      />
    </View>
  );
}
