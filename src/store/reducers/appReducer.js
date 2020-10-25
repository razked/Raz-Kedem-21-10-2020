import * as actionTypes from "../actions";

const initialState = {
  favorites: [],
  celcius: true,
  themeLight: false,
  selectedPlace: {
    id: null,
    city: null,
    country: null,
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
      localStorage.setItem('favorites', JSON.stringify(newState.favorites));
      return newState;

    case actionTypes.SET_FAVORITE:
      let thumbnail = action.val;
      let newFavorite = { ...newState.selectedPlace, thumbnail };
      newState.favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(newState.favorites));
      return newState;

    case actionTypes.SET_SELECTED_PLACE:
      newState.selectedPlace = action.val;
      return newState;

    case actionTypes.SET_FAVORITES_FROM_STORGE:
      newState.favorites = action.val;
      return newState;

    default:
      return state;
  }
};

export default reducer;
