import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Components/Styles/GlobalStyles";
import { lightTheme, darkTheme } from "./Components/Styles/Themes";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import { handleGeoPermission } from "./helper/userGeoLocation";
import * as actionTypes from "./store/actions";
import "react-toastify/dist/ReactToastify.css";

// components
import Header from "./Containers/Header/Header";
import Home from "./Containers/Home/Home";
import Favorites from "./Containers/Favorites/Favorites";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const ThemeLight = useSelector((state) => state.app.themeLight);
  const selectedPlace = useSelector((state) => state.app.selectedPlace);

  // set or get user favorites from local storage
  useEffect(() => {
    let localFavorites = localStorage.getItem("favorites");

    if (localFavorites) {
      let storedFavorites = JSON.parse(localFavorites);
      dispatch({
        type: actionTypes.SET_FAVORITES_FROM_STORGE,
        val: storedFavorites,
      });
    } else {
      let favoritesArr = [];
      localStorage.setItem("favorites", JSON.stringify(favoritesArr));
    }
  });

  // get user geolocation if available
  useEffect(() => {
    let userCoordinates = handleGeoPermission();
    console.log("coord", userCoordinates);

    if (userCoordinates.length > 0) {
      getWeatherByUserLocation(userCoordinates);
    }
  }, [selectedPlace]);

  const getWeatherByUserLocation = (cordinates) => {
    // let url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&q=${cordinates[0],cordinates[1]}&toplevel=true`;
    // axios.get(url).then((res) => {
    // let id = res.data[0].Key;
    // let city = res.data[0].EnglishName;
    // let country = res.data[0].Country.EnglishName;
    // dispatch({ type: actionTypes.SET_SELECTED_PLACE, val: {id, city, country} });
    // });
  };

  return (
    <div className="App">
      <ThemeProvider theme={ThemeLight ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Router>
          <Header />

          <Switch>
            <Route path="/favorites" component={() => <Favorites />} />
            <Route path="/" component={() => <Home />} />
            <Redirect to="/" />
          </Switch>

          <ToastContainer
            hideProgressBar={true}
            autoClose={4000}
            position="bottom-right"
            pauseOnFocusLoss={false}
          />
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
