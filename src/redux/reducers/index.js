import { combineReducers } from "redux";
import locationReducer from "./locationReducer.js";

const reducers = combineReducers({
  weatherReducer: locationReducer,
});

export default reducers;
