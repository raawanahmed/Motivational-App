import { StyleSheet, Text, View } from "react-native";
export default function QuotesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Here is your motivational quote today.</Text>
      <Text>Keep Going</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
