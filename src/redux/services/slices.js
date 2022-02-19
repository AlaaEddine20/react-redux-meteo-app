import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = ``;

export const fetchWeather = createAsyncThunk(
  "weather/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${process.env.REACT_APP_API_KEY}`,
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data);
      }
    }
  },
);

// slice
const weatherSlice = createSlice({
  name: "weather",
  initialState: {},
  extraReducers: (builder) => {
    // pending request
    builder.addCase(fetchWeather.pending, (state, action) => {
      state.loading = true;
    });
    // fulfilled request
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weather = action?.payload;
      state.loading = false;
      state.error = false;
    });
    // rejected request
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.error = action?.payload;
      state.weather = undefined;
      state.loading = false;
    });
  },
});

export default weatherSlice.reducer;
