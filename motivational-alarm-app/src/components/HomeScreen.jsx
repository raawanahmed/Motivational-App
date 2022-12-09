import { StyleSheet, Button, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Set an Alarm"
        onPress={() => navigation.navigate("Alarm")}
      />
      <Button
        title="Go to your motivational video today!"
        onPress={() => navigation.navigate("Video Screen")}
      />
      <Button
        title="Go to your motivational quote today!"
        onPress={() => navigation.navigate("Quotes Screen")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
