import { combineReducers } from "redux";
import locationReducer from "./locationReducer.js";

const customReducers = combineReducers({
  weatherReducer: locationReducer,
});

export default customReducers;
