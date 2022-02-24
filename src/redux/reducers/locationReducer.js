import { ActionTypes } from "../constants/index";

const initialState = {
  locations: [],
};

const locationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_LOCATIONS:
      return { ...state, locations: state.locations.concat(payload) };
    default:
      return state;
  }
};

export default locationReducer;
