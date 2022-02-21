import { ActionTypes } from "../constants/index";

const initialState = {
  locations: [],
};

const locationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_LOCATIONS:
      return { ...state, locations: state.locations.concat(payload) };
    /*case ActionTypes.ADD_LOCATION:
      return { ...state.locations, locations: { ...state.locations, payload } };*/
    default:
      return state;
  }
};

export default locationReducer;
