import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


import * as actionTypes from '../../../store/actions';

import "./FavoritePlace.scss";

// styled
const Title = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 1.6rem;
  font-weight: 600;
`;

const Tempature = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
`;


const FavoritePlace = (props) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { t } = useTranslation();
  const { id, thumbnail, city, country } = props;

  const celciusType = useSelector((state) => state.app.celcius);
  const [weather, setWeather] = useState({
    celcius: "-",
    farenheit: "-",
  });

  // get place current weather on load
  useEffect(() => {
    if (props.id) {
      getWeatherByPlaceId();
    }
  }, [props.id]);

  const getWeatherByPlaceId = () => {
    let url = `https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&details=false`;
    axios.get(url).then((res) => {
      let temp = { ...weather };
      temp.celcius = res.data[0].Temperature.Metric.Value;
      temp.farenheit = res.data[0].Temperature.Imperial.Value;
      setWeather(temp);
    })
    .catch((error) => {
      toast.error(`${t('errors.placeTempture')} ${city} ${t('errors.placeTempture2')}`);
    });
  };

  const handleRenderPlaceDetails = () => {
    dispatch({ type: actionTypes.SET_SELECTED_PLACE, val: {id, city, country} });
    history.push('/');
  };

  const renderPlaceTempature = () => {
    let tempature = celciusType ? weather.celcius : weather.farenheit;
    let tempatureType = celciusType ? "c" : "f";

    if(weather.celcius !== '-' || weather.farenheit !== '-') {
      return `${tempature} ${tempatureType}`
    }
  }
  

  return (
    <div className="FavoritePlace" onClick={handleRenderPlaceDetails}>
      <div
        className="thumbnail"
        style={{ backgroundImage: `url(${thumbnail})` }}
      ></div>

      <div>
        <Title>{city}</Title>
        <Tempature>{renderPlaceTempature()}</Tempature>
      </div>

    </div>
  );
};

export default FavoritePlace;
