import { ADD_ALARM, DELETE_ALARM, DELETE_ALL_ALARMS } from "../actions/types";
import { cancelNotification } from "../../components/TimePicker";
import { cancelAllNotifications } from "../../components/TimePicker";

const initialState = {
  alarms: [],
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
      return {
        ...state,
        alarms: state.alarms.concat(alarm),
      };
    case DELETE_ALARM:
      // for (var i = 0; i < state.alarms.length; i++) {
      //   if (state.alarms[i].id == action.payload.id) {
      //     // console.log(action.payload.notificationId);
      //     cancelNotification(action.payload.notificationId);
      //   }
      //   //console.log(state.alarms[i]);
      // }
      return {
        ...state,
        alarms: state.alarms.filter((v) => {
          // console.log(v.id, action.payload.id);
          if (action.payload.id !== undefined) {
            console.log(v.id._z, action.payload.id);
            return v.id !== action.payload.id;
          } else {
            console.log(v.notificationId._z, action.payload.notificationId);
            return v.notificationId._z !== action.payload.notificationId;
          }
        }),
      };
    case DELETE_ALL_ALARMS:
      cancelAllNotifications();
      return {
        ...state,
        alarms: [],
      };

    default:
      return state;
  }
};

export default alarmReducer;
