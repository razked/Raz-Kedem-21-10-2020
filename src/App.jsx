import React from "react";
import { useSelector } from "react-redux";
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
import "react-toastify/dist/ReactToastify.css";

// components
import Header from "./Containers/Header/Header";
import Home from './Containers/Home/Home';
import Favorites from './Containers/Favorites/Favorites';

import "./App.scss";

const App = () => {
  const ThemeLight = useSelector((state) => state.app.themeLight);

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

          <ToastContainer hideProgressBar={true} />
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
