import { ActionTypes } from "../constants/index.js";

export const setLocations = (locations) => {
  return {
    type: ActionTypes.SET_LOCATIONS,
    payload: locations,
  };
};

export const addLocation = (location) => {
  return {
    type: ActionTypes.ADD_LOCATION,
    payload: location,
  };
};
