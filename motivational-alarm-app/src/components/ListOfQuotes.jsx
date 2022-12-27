import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import {
  addQuoteToFavQuotes,
  deleteQuoteFromFavQuotes,
  setLikeStateToQuote,
  setLocalStorageOfLikes,
  setLocalStorageOfFavQuotes,
} from "../redux/actions/actions";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ListOfQuotes({ quotes }) {
  const dispatch = useDispatch();
  const isQuoteFav = useSelector((state) => state.quotesReducer.isQuoteFav);
  const [isLoading, setIsLoading] = useState(false);

  const init = async () => {
    setIsLoading(true);
    let storageFavQuotes = await AsyncStorage.getItem("favQuotes");
    if (storageFavQuotes != null) {
      storageFavQuotes = JSON.parse(storageFavQuotes);
      dispatch(setLocalStorageOfFavQuotes(storageFavQuotes));
    }
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
  const renderItem = ({ item }) => {
    return (
      <View style={styles.quote}>
        <Text style={styles.textQuote}>{item.quote}</Text>
        <TouchableOpacity
          onPress={() => {
            handleOnLikePress(item.id, item.quote);
          }}
          style={styles.iconStyle}
        >
          <AntDesign
            name={isQuoteFav[item.id] ? "heart" : "hearto"}
            size={30}
            color="#c3a1c2"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/Images/background2.jpg")}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <View style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
            <Text style={styles.headerTitle}>Motivational Quotes</Text>
            {isLoading ? (
              <Text>loading...</Text>
            ) : (
              <FlatList
                keyExtractor={(item) => item.id}
                data={quotes}
                renderItem={renderItem}
                style={{marginBottom : 100}}
              />
            )}
          </View>
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    textAlign: "center",
    fontSize: 25,
    color: "#001b36",
    fontWeight: "bold",
    padding: 6,
    marginTop: 50,
  },
  icon: {
    margin: 5,
  },
  quote: {
    flex: 1,
    padding: 20,
    marginVertical: 6,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    alignItems: "stretch",
    width: "100%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textQuote: {
    color: "#c3a1c2",
  },
  iconStyle: {
    flexDirection: "row-reverse",
  },
});
