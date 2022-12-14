import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase(
  {
    name: "videosDB",
    location: "default",
    
  },
  () => {},
  (error) => {
    console.log(error);
  }
);

export const createTable = () => {
  console.log("in CreateTable function");
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS videos (id INTEGER PRIMARY KEY AUTOINCREMENT, index INTEGER,  path TEXT)"
    );
  });
};

export const insertVideo = async (index) => {
  console.log("In insertVideo Function. ");
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql("INSERT INTO videos (path, index) VALUES (?, ?)", [
        `../../assets/videos/video${index}.mp4`,
        index,
      ]);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getVideo = async (index) => {
  console.log("In getVideo Function. ");
  console.log(db);

  await db.transaction(async (tx) => {
    await tx.executeSql(
      "SELECT path FROM videos WHERE index = ?",
      [index],
      (tx, result) => {
        console.log("rawan");
        console.log(result.rows.item(0).path);
        return result.rows.item(0).path;
      }
    );
  });

  console.log("felll akheeeer")
};
