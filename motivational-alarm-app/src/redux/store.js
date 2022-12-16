import { legacy_createStore, combineReducers } from "redux";
import alarmReducer from "./reducers/alarmReducer";
import quotesReducer from "./reducers/quotesReducer";
const store = legacy_createStore(combineReducers({alarmReducer, quotesReducer}));
//console.log(store.getState())
export default store;
