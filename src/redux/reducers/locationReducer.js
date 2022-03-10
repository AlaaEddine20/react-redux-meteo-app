import { ActionTypes } from "../constants/index";

const initialState = {
  locations: [],
  forecastTimeline: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_LOCATIONS:
      return { ...state, locations: state.locations.concat(payload) };
    case ActionTypes.SET_FORECAST:
      return { ...state, forecastTimeline: payload };
    default:
      return state;
  }
};

export default reducer;
