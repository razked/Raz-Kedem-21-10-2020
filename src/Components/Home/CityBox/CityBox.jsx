import React from "react";
import { useSelector } from "react-redux";

import "./CityBox.scss";

const CityBox = (props) => {
  const {
    WeatherText,
    celcius,
    farenheit,
  } = props.data;

  const celciusType = useSelector((state) => state.app.celcius);
  const selectedPlace = useSelector((state) => state.app.selectedPlace);

  let tempature = celciusType ? celcius : farenheit;
  let tempatureType = celciusType ? "c" : "f";

  return (
    <div className="CityBox">
      <div className="title">
        <div className="location">
          <span className="city">{selectedPlace.city}</span>
          <span className="country">{selectedPlace.country}</span>
        </div>
      </div>

      <div className="tempature">
        <span className="temp-number">{tempature}</span>
        <span className="temp-type">{tempatureType}</span>
      </div>

      <div className="weather-text">{WeatherText}</div>
    </div>
  );
};

export default CityBox;
