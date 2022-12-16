import ListOfQuotes from "./ListOfQuotes";
import { useSelector } from "react-redux";
export default function FavQuotesScreen() {
  const favQuotes = useSelector((state) => state.quotesReducer.favQuotes);
  return <ListOfQuotes quotes={favQuotes}></ListOfQuotes>;
}
