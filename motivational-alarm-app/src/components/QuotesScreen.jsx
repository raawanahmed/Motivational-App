import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  addQuoteToFavQuotes,
  deleteQuoteFromFavQuotes,
} from "../redux/actions/actions";
export default function QuotesScreen() {
  const navigation = useNavigation();
  // const [isLike, setIsLike] = useState([]);
  const dispatch = useDispatch();
  const [isQuoteFav, setQuoteToFav] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const Quotes = useSelector((state) => state.quotesReducer.quotes);
  const handleOnLikePress = (quoteId, quote) => {
    const isLike = [...isQuoteFav];
    // console.log(quoteId);
    console.log("before click " + isLike);
    if (isLike[quoteId] === true) {
      dispatch(addQuoteToFavQuotes(quoteId, quote));
    } else {
      dispatch(deleteQuoteFromFavQuotes(quoteId));
    }
    isLike[quoteId] = !isLike[quoteId];
    console.log(isLike);
    setQuoteToFav(isLike);
    console.log("You pressed on like.");
  };
  // navigation.navigate("Fav Quotes Screen");
  const renderItem = ({ item }) => {
    return (
      <View>
        <View>
          <Text>{item.quote}</Text>
          <TouchableOpacity
            onPress={() => {
              handleOnLikePress(item.id, item.quote);
            }}
          >
            <AntDesign
              name={isQuoteFav[item.id] ? "heart" : "hearto"}
              size={30}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
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
  icon: {
    marginHorizontal: 15,
    marginRight: 15,
  },
});
