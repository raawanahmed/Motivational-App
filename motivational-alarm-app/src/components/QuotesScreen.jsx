import ListOfQuotes from "./ListOfQuotes";
import { useSelector } from "react-redux";
export default function QuotesScreen() {
  const Quotes = useSelector((state) => state.quotesReducer.quotes);
  return <ListOfQuotes quotes={Quotes}></ListOfQuotes>;
}
