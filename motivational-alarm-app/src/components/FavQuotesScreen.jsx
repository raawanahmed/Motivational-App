import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import {
  addQuoteToFavQuotes,
  deleteQuoteFromFavQuotes,
  setLikeStateToQuote,
  setLocalStorageOfFavQuotes,
} from "../redux/actions/actions";
import { useState, useEffect } from "react";
export default function FavQuotesScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const favQuotes = useSelector((state) => state.quotesReducer.favQuotes);
  const isQuoteFav = useSelector((state) => state.quotesReducer.isQuoteFav);

  const init = async () => {
    setIsLoading(true);
    let storageFavQuotes = await AsyncStorage.getItem("favQuotes");
    if (storageFavQuotes != null) {
      storageFavQuotes = JSON.parse(storageFavQuotes);
      dispatch(setLocalStorageOfFavQuotes(storageFavQuotes));
    }
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
 // console.log(favQuotes);
  const handleOnLikePress = (quoteId, quote) => {
    const isLike = [...isQuoteFav];
    isLike[quoteId] = !isLike[quoteId];
    // console.log(isLike);
    dispatch(setLikeStateToQuote(quoteId));
    // console.log(isQuoteFav);
    if (isLike[quoteId] === true) {
      dispatch(addQuoteToFavQuotes(quoteId, quote));
    } else {
      dispatch(deleteQuoteFromFavQuotes(quoteId));
    }
   // console.log("You pressed on like.");
  };
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
