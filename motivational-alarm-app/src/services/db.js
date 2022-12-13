// import { SQLite } from "expo";
// import SQLite from "react-native-sqlite-storage";
// import { useDispatch, useSelector } from "react-redux";
//  const db = SQLite.openDatabase(
//   {
//     name: "MainDB",
//     location: "default",
//   },
//   () => {
//     console.log("Tmam");
//   },
//   (error) => {
//     console.log(error);
//   }
// );

// export const createTable = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "CREATE TABLE IF NOT EXISTS Alarms (id INTEGER PRIMARY KEY AUTOINCREMENT, notificationId INTEGER, time TEXT, date TEXT)"
//     );
//   });
// };

// export const insertAlarm = async (time, date, notificationId) => {
//   console.log("In insertAlarm Function. ");
//   try {
//     await db.transaction(async (tx) => {
//       await tx.executeSql(
//         "INSERT INTO Alarms (time, date, notificationId) VALUES (?, ?, ?)",
//         [time, date, notificationId]
//       );
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
