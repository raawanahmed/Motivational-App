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

import {
  addQuoteToFavQuotes,
  deleteQuoteFromFavQuotes,
  setLikeStateToQuote,
  setLocalStorageOfLikes,
} from "../redux/actions/actions";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function QuotesScreen() {
  const navigation = useNavigation();
  // const [isLike, setIsLike] = useState([]);
  const dispatch = useDispatch();
  const Quotes = useSelector((state) => state.quotesReducer.quotes);
  const favQuotes = useSelector((state) => state.quotesReducer.favQuotes);
  const isQuoteFav = useSelector((state) => state.quotesReducer.isQuoteFav);
  const [isLoading, setIsLoading] = useState(false);

  const init = async () => {
    setIsLoading(true);
    let storageLikeQuotes = await AsyncStorage.getItem("isQuoteFav");
    if (storageLikeQuotes != null) {
      storageLikeQuotes = JSON.parse(storageLikeQuotes);
      dispatch(setLocalStorageOfLikes(storageLikeQuotes));
    }
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
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
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={Quotes}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 15,
    marginRight: 15,
  },
});
