import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "../services/slices";

const store = configureStore({
  reducer: weatherSlice,
});

export default store;
