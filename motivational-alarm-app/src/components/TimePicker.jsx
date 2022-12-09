import React, { useState, useEffect } from "react";
import { View, Linking } from "react-native";
import * as Notification from "expo-notifications";
import DateTimePicker from "react-native-modal-datetime-picker";
import MyButton from "./MyButton";
import { useDispatch } from "react-redux";
import { ADD_ALARM, DELETE_ALL_ALARMS } from "../redux/actions/types";
import { Alert } from "react-native";
import { Audio } from "expo-av";
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
  const [numOfID, setID] = React.useState(3);
  const [sound, setSound] = useState();
  const dispatch = useDispatch();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const onPress = () => {
    console.log("Notification pressed");
  };
  const handleReceivedNotification = () => {
    playSound();
  };

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
  useEffect(() => {
    const backgroundSubscription =
      Notification.addNotificationResponseReceivedListener(() => {
        console.log("hiii");
       // stopSound();
      });
    const foregroundSubscription = Notification.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
        playSound();
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
    var currentTime = Date.now();
    if (date.getTime() < currentTime) {
      Alert.alert("please choose future time");
      hideDatePicker();

      return;
    }
    handleOnAddAlarm(date);
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

  const handleOnAddAlarm = (date) => {
    const t = formatTime(date);
    const d = formatDate(date);
    console.log(t, d);
    dispatch({
      type: ADD_ALARM,
      payload: { id: numOfID, time: t, date: d },
    });
    setID(numOfID + 1);
  };
  const handleOnDeleteAllAlarms = () => {
    dispatch({
      type: DELETE_ALL_ALARMS,
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
      <MyButton
        buttonTitle={"Delete All Alarms"}
        buttonColor={"red"}
        actionOnPress={() => {
          handleOnDeleteAllAlarms();
          console.log("Delete All Alarms button");
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
