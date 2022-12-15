import {
  ADD_ALARM,
  DELETE_ALARM,
  DELETE_ALL_ALARMS,
  SET_ALARMS,
} from "../actions/types";
import { cancelNotification } from "../../components/TimePicker";
import { cancelAllNotifications } from "../../components/TimePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  alarms: [],
};
const updateStoredAlarms = async (alarms) => {
  await AsyncStorage.setItem("alarms", JSON.stringify(alarms));
};
const alarmReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALARM:
      const payload = action.payload;
      const alarm = {
        id: payload.id,
        time: payload.time,
        date: payload.date,
        notificationId: payload.notificationId,
      };
      const updatedAlarms = state.alarms.concat(alarm);
      updateStoredAlarms(updatedAlarms);
      return {
        ...state,
        alarms: updatedAlarms,
      };
    case DELETE_ALARM:
      // for (var i = 0; i < state.alarms.length; i++) {
      //   if (state.alarms[i].id == action.payload.id) {
      //     // console.log(action.payload.notificationId);
      //     cancelNotification(action.payload.notificationId);
      //   }
      //   //console.log(state.alarms[i]);
      // }
      const alarmsAfterDelete = state.alarms.filter((v) => {
        // console.log(v.id, action.payload.id);
        if (action.payload.id !== undefined) {
          console.log(v.id._z, action.payload.id);
          return v.id !== action.payload.id;
        } else {
          console.log(v.notificationId._z, action.payload.notificationId);
          return v.notificationId._z !== action.payload.notificationId;
        }
      });
      updateStoredAlarms(alarmsAfterDelete);
      return {
        ...state,
        alarms: alarmsAfterDelete,
      };
    case DELETE_ALL_ALARMS:
      cancelAllNotifications();
      updateStoredAlarms([]);
      return {
        ...state,
        alarms: [],
      };
    case SET_ALARMS:
      return {
        ...state,
        alarms: action.payload.alarms,
      };

    default:
      return state;
  }
};

export default alarmReducer;
