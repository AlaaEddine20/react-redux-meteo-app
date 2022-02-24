import { ActionTypes } from "../constants/index.js";

export const addLocations = (locations) => {
  return {
    type: ActionTypes.ADD_LOCATIONS,
    payload: locations,
  };
};

