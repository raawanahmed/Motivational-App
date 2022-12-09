import { legacy_createStore } from "redux";
import alarmReducer from "./reducers/alarmReducer";
const store = legacy_createStore(alarmReducer);
export default store;
