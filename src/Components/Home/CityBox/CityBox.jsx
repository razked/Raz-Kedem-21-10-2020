import React from "react";
import { useSelector } from "react-redux";

import "./CityBox.scss";

const CityBox = (props) => {
  const {
    city,
    country,
    WeatherText,
    WeatherIcon,
    celcius,
    farenheit,
  } = props.data;

  const celciusType = useSelector((state) => state.app.celcius);

  let iconSrc = `https://developer.accuweather.com/sites/default/files/${WeatherIcon}-s.png`;
  let tempature = celciusType ? celcius : farenheit;
  let tempatureType = celciusType ? "c" : "f";

  return (
    <div className="CityBox">
      <div className="title">
        <div className="location">
          <span className="city">{city}</span>
          <span className="country">{country}</span>
        </div>
      </div>

      <div className="tempature">
        <span className="temp-number">{tempature}</span>
        <span className="temp-type">{tempatureType}</span>
      </div>

      <div className="icon">
        <img src={iconSrc} alt="icon" />
      </div>

      <div className="weather-text">{WeatherText}</div>
    </div>
  );
};

export default CityBox;
