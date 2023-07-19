import { ActionTypes } from "../constants/index.js";

export const addLocations = (locations) => {
  return {
    type: ActionTypes.ADD_LOCATIONS,
    payload: locations,
  };
};

export const setForecast = (forecast) => {
  return {
    type: ActionTypes.SET_FORECAST,
    payload: forecast,
  };
};

