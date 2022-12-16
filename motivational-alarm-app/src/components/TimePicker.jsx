import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import * as Notification from "expo-notifications";
import DateTimePicker from "react-native-modal-datetime-picker";
import MyButton from "./MyButton";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { formatDate, formatTime } from "../services/helperFunctions";
import {
  addAlarm,
  deleteAllAlarms,
  deleteNotificationFromList,
} from "../redux/actions/actions";

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      vibrate: false,
    };
  },
});
export async function cancelAllScheduledNotifications() {
  // console.log("In Cancel All Notifications");
  await Notification.cancelAllScheduledNotificationsAsync();
}
export async function cancelScheduledNotification(notificationId) {
  // console.log(notificationId);
  // await Notification.dismissNotificationAsync(notificationId);
  await Notification.cancelScheduledNotificationAsync(notificationId);
}
export default function TimePicker() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [numOfID, setID] = React.useState(3);
  const [sound, setSound] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/yaSabahElro3b.wav")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const stopSound = async () => {
    await sound.pauseAsync();
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
      Notification.addNotificationResponseReceivedListener((notification) => {
        // after click on the notification
        // console.log(notification.notification.request.identifier);
        dispatch(
          deleteNotificationFromList(
            notification.notification.request.identifier
          )
        );
        // stopSound();
        navigation.navigate("Video Screen");
      });
    const foregroundSubscription = Notification.addNotificationReceivedListener(
      // when notification received
      (notification) => {
        // console.log(notification.request.identifier);
        dispatch(deleteNotificationFromList(notification.request.identifier));
        playSound();
      }
    );

    return () => {
      // cleanup function remove subscription before component unmounts
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  async function handleAddNotification(date) {
    const notificationId = await Notification.scheduleNotificationAsync({
      content: {
        title: "Motivational Reminder Notification",
        body: "See Your Motivational Video for today!",
      },
      trigger: {
        date: date,
      },
    });
    return notificationId;
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleOnConfirm = (date) => {
    var currentTime = Date.now();
    if (date.getTime() < currentTime) {
      Alert.alert("Please choose future time.");
      hideDatePicker();
      return;
    }
    hideDatePicker();
    const notificationId = handleAddNotification(date);
    handleOnAddAlarm(date, notificationId);
  };

  const handleOnAddAlarm = (date, notificationIdentifier) => {
    const formattedTime = formatTime(date);
    const formattedDate = formatDate(date);
    // console.log(
    //   "formattedTime: " + formattedTime,
    //   "formattedDate: " + formattedDate
    // );
    // console.log("Notification Identifier: "+notificationIdentifier);
    dispatch(
      addAlarm(numOfID, formattedTime, formattedDate, notificationIdentifier)
    );
    setID(numOfID + 1);
  };
  const yesButtonPressed = () => {
    console.log("Yes Pressed");
    dispatch(deleteAllAlarms());
  };
  const alertBeforeDeletingAllAlarms = () => {
    Alert.alert("Alert!!!", "Do you want to delete all alarms ?", [
      {
        text: "No",
        onPress: () => console.log("No Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => yesButtonPressed() },
    ]);
  };

  return (
    <View>
      <MyButton
        buttonTitle={"Add Alarm"}
        buttonColor={"green"}
        actionOnPress={() => {
          showDatePicker();
          console.log("Add button pressed");
        }}
      />
      <MyButton
        buttonTitle={"Delete All Alarms"}
        buttonColor={"red"}
        actionOnPress={() => {
          alertBeforeDeletingAllAlarms();
          console.log("Delete all alarms button pressed");
        }}
      />
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleOnConfirm}
        onCancel={hideDatePicker}
        textColor="black"
      />
    </View>
  );
}
