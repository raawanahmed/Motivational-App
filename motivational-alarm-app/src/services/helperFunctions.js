import * as Notification from "expo-notifications";
export const formatTime = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var AmPm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var time = hours + ":" + minutes + " " + AmPm;
  return time;
};
export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

export async function cancelAllScheduledNotifications() {
  // console.log("In Cancel All Notifications");
  await Notification.cancelAllScheduledNotificationsAsync();
}
export async function cancelScheduledNotification(notificationId) {
  // console.log(notificationId);
  // await Notification.dismissNotificationAsync(notificationId);
  await Notification.cancelScheduledNotificationAsync(notificationId);
}
