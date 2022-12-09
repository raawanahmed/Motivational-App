import { ADD_ALARM, DELETE_ALARM, DELETE_ALL_ALARMS } from "../actions/types";

const initialState = {
  alarms: [
    { id: 0, time: "12:38 AM", date: "09/12/2022" },
    { id: 1, time: "01:56 AM", date: "10/12/2022" },
  ],
};
const alarmReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALARM:
      const payload = action.payload;
      const alarm = { id: payload.id, time: payload.time, date: payload.date };
      return {
        ...state,
        alarms: state.alarms.concat(alarm),
      };
    case DELETE_ALARM:
      return {
        ...state,
        alarms: state.alarms.filter((v) => {
          return v.value !== action.payload;
        }),
      };
    case DELETE_ALL_ALARMS:
      return {
        ...state,
        alarms: [],
      };

    default:
      return state;
  }
};

export default alarmReducer;
