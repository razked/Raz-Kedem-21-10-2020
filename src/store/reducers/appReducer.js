import * as actionTypes from "../actions";

const initialState = {
  favorites: [],
  celcius: true,
  themeLight: false,
  selectedPlace: {
    id: "215854",
    city: "Tel Aviv",
    country: "Israel",
  },
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
      let newFavorites = newState.favorites.filter(
        (place) => place.id !== newState.selectedPlace.id
      );
      newState.favorites = newFavorites;
      return newState;

    case actionTypes.SET_FAVORITE:
      let thumbnail = action.val;
      let newFavorite = { ...newState.selectedPlace, thumbnail };
      newState.favorites.push(newFavorite);
      return newState;

    case actionTypes.SET_SELECTED_PLACE:
      newState.selectedPlace = action.val;
      console.log(newState);
      return newState;

    default:
      return state;
  }
};

export default reducer;
