import React, { useState, useEffect } from "react";
import {View} from "react-native";
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
export default function TimePicker() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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
    console.log(date);
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
      />
    </View>
  );
}
