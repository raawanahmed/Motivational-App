import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
export default function FavQuotesScreen() {
  const favQuotes = [];
  const renderItem = ({ item }) => {
    return <View></View>;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Favorite Motivational Quotes</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={favQuotes}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
