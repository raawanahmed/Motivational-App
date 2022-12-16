import {
  ADD_ALARM,
  DELETE_ALARM,
  DELETE_ALL_ALARMS,
  SET_ALARMS,
} from "./types";
// all actions returns object to dispatch
export const addAlarm = (
  numOfID,
  formattedTime,
  formattedDate,
  notificationIdentifier
) => {
  return {
    type: ADD_ALARM,
    payload: {
      id: numOfID,
      time: formattedTime,
      date: formattedDate,
      notificationId: notificationIdentifier,
    },
  };
};
export const deleteAlarm = (alarmDetails) => {
  return {
    type: DELETE_ALARM,
    payload: {
      id: alarmDetails.id,
      time: alarmDetails.time,
      date: alarmDetails.date,
      notificationId: alarmDetails.notificationId,
    },
  };
};
export const deleteAllAlarms = () => {
  return {
    type: DELETE_ALL_ALARMS,
  };
};
export const deleteNotificationFromList = (notificationId) => {
  return {
    type: DELETE_ALARM,
    payload: {
      notificationId: notificationId,
    },
  };
};
export const setLocalStorageOfAlarms = (storageAlarms) => {
  return {
    type: SET_ALARMS,
    payload: {
      alarms: storageAlarms,
    },
  };
};
