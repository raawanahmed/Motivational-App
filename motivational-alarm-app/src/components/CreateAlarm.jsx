import React from "react";
import { StyleSheet, View } from "react-native";
import TimePicker from "./TimePicker";
import ListAlarms from "./ListAlarms";
import { SafeAreaView, ImageBackground } from "react-native";

export default function CreateAlarm() {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require("../../assets/Images/background2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <ListAlarms />
          <TimePicker />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "rgba(0,0,0,0.4)",
  }
});



// import React from "react";
// import { StyleSheet, View } from "react-native";
// import TimePicker from "./TimePicker";
// import ListAlarms from "./ListAlarms";
// import { SafeAreaView, ImageBackground } from "react-native";
// export default function CreateAlarm() {
//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require("../../assets/Images/background2.jpg")}
//         style={{ flex: 1 }}
//         resizeMode="cover"
//       >
//         <View style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
//           <ListAlarms />
//           <TimePicker />
//         </View>
//       </ImageBackground>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     width:"100%"
//   },
// });
