import {
  ADD_ALARM,
  ADD_QUOTE_TO_FAV_QUOTES,
  DELETE_ALARM,
  DELETE_ALL_ALARMS,
  DELETE_QUOTE_TO_FAV_QUOTES,
  SET_ALARMS,
  SET_FAV_QUOTES,
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

export const addQuoteToFavQuotes = (quoteId, quote) => {
  return {
    type: ADD_QUOTE_TO_FAV_QUOTES,
    payload: {
      id: quoteId,
      quoteText: quote,
    },
  };
};
export const deleteQuoteFromFavQuotes = (quoteId, quote) => {
  return {
    type: DELETE_QUOTE_TO_FAV_QUOTES,
    payload: {
      id: quoteId,
      quoteText: quote,
    },
  };
};
export const setLocalStorageOfFavQuotes = (storageFavQuotes) => {
  return {
    type: SET_FAV_QUOTES,
    payload: {
      alarms: storageFavQuotes,
    },
  };
};
