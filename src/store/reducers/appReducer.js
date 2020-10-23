import * as actionTypes from "../actions";

const initialState = {
  favorites: [],
  celcius: true,
  themeLight: true,
};

const reducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    
    case actionTypes.TOGGLE_THEME:
      newState.themeLight = !newState.themeLight;
      return newState;

    case actionTypes.TOGGLE_TEMP:
      newState.celcius = !newState.celcius;
      return newState;

    case actionTypes.RMV_FAVORITE:
      let newPlaces = newState.favorites.filter((place) => place.id !== action.val);
      newState.favorites = newPlaces;
      return newState;

    case actionTypes.SET_FAVORITE:
      newState.favorites.push(action.val);
      return newState;

    default:
      break;
  }
  return state;
};

export default reducer;
