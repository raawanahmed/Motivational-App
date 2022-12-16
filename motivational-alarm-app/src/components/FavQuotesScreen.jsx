import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
export default function FavQuotesScreen() {
  const favQuotes = useSelector((state) => state.quotesReducer.favQuotes);
  //console.log(favQuotes);
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.quote}</Text>
      </View>
    );
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
