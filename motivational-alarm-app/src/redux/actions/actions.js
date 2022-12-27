import {
  ADD_ALARM,
  ADD_QUOTE_TO_FAV_QUOTES,
  DELETE_ALARM,
  DELETE_ALL_ALARMS,
  DELETE_QUOTE_FROM_FAV_QUOTES,
  GET_ALARMS,
  SET_FAV_QUOTES_TO_LOCAL_STORAGE,
  SET_LIKES,
  SET_LIKES_TO_LOCAL_STORAGE,
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
      id: numOfID + 1,
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
export const getLocalStorageOfAlarms = (storageAlarms) => {
  return {
    type: GET_ALARMS,
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
      quote: quote,
    },
  };
};
export const deleteQuoteFromFavQuotes = (quoteId, quote) => {
  return {
    type: DELETE_QUOTE_FROM_FAV_QUOTES,
    payload: {
      id: quoteId,
      quote: quote,
    },
  };
};
export const setLocalStorageOfFavQuotes = (storageFavQuotes) => {
  return {
    type: SET_FAV_QUOTES_TO_LOCAL_STORAGE,
    payload: {
      favQuotes: storageFavQuotes,
    },
  };
};
export const setLikeStateToQuote = (quoteId) => {
  return {
    type: SET_LIKES,
    payload: {
      id: quoteId,
    },
  };
};
export const setLocalStorageOfLikes = (storageLikeQuotes) => {
  return {
    type: SET_LIKES_TO_LOCAL_STORAGE,
    payload: {
      isQuoteFav: storageLikeQuotes,
    },
  };
};
