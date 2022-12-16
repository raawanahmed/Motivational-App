import {
  ADD_QUOTE_TO_FAV_QUOTES,
  DELETE_QUOTE_TO_FAV_QUOTES,
  SET_FAV_QUOTES,
} from "../actions/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
const updateFavQuotes = async (favQuotes) => {
  await AsyncStorage.setItem("favQuotes", JSON.stringify(favQuotes));
};
const initialState = {
  quotes: [
    {
      id: 0,
      quote:
        "Success is not final; failure is not fatal: It is the courage to continue that counts. — Winston S. Churchill",
    },
    {
      id: 1,
      quote:
        "It is better to fail in originality than to succeed in imitation. — Herman Melville",
    },
    {
      id: 2,
      quote:
        "The road to success and the road to failure are almost exactly the same. — Colin R. Davis",
    },
    {
      id: 3,
      quote:
        "Success usually comes to those who are too busy looking for it — Henry David Thoreau",
    },
    {
      id: 4,
      quote: "Don’t let yesterday take up too much of today. — Will Rogers",
    },
    {
      id: 5,
      quote:
        "Just one small positive thought in the morning can change your whole day. — Dalai Lama",
    },
  ],
  favQuotes: [],
};

const quotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUOTE_TO_FAV_QUOTES:
      const quote = { id: action.payload.id, quoteText: action.payload.quote };
      const updatedFavQuotes = state.favQuotes.concat(quote);
      updateFavQuotes(updatedFavQuotes);
      return {
        ...state,
        favQuotes: updatedFavQuotes,
      };
    case DELETE_QUOTE_TO_FAV_QUOTES:
      const favQuotesAfterDelete = state.favQuotes.filter((v) => {
        return v.id !== action.payload.id;
      });
      updateFavQuotes(favQuotesAfterDelete);
      return {
        ...state,
        favQuotes: favQuotesAfterDelete,
      };
    case SET_FAV_QUOTES:
      return {
        ...state,
        favQuotes: action.payload.favQuotes,
      };
    default:
      return state;
  }
};

export default quotesReducer;
