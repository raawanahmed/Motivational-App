import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function QuotesScreen() {
  const navigation = useNavigation();
  const Quotes = [
    {
      id: 1,
      quote:
        "Success is not final; failure is not fatal: It is the courage to continue that counts. — Winston S. Churchill",
    },
    {
      id: 2,
      quote:
        "It is better to fail in originality than to succeed in imitation. — Herman Melville",
    },
    {
      id: 3,
      quote:
        "The road to success and the road to failure are almost exactly the same. — Colin R. Davis",
    },
    {
      id: 4,
      quote:
        "Success usually comes to those who are too busy looking for it — Henry David Thoreau",
    },
    {
      id: 5,
      quote: "Don’t let yesterday take up too much of today. — Will Rogers",
    },
    {
      id: 6,
      quote:
        "Just one small positive thought in the morning can change your whole day. — Dalai Lama",
    },
  ];
  // navigation.navigate("Fav Quotes Screen");
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.quote}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Motivational Quotes</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={Quotes}
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
