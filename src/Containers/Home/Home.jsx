import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Slide from "react-reveal/Slide";

// components
import CityBox from "../../Components/Home/CityBox/CityBox";
import Forcast from "../../Components/Home/Forcast/Forcast";
import LikeLocation from "../../Components/Home/LikeLocation/LikeLocation";
import SearchBox from "../../Components/Home/SearchBox/SearchBox";
import Loader from "../../Components/UI/Loader/Loader";

// style
import "./Home.scss";

// fall back location image
import worldPic from "../../images/world.jpg";

const Home = () => {
  const { t } = useTranslation();
  const selectedPlace = useSelector((state) => state.app.selectedPlace);
  const [loading, setLoading] = useState(true);

  const [locationDisplayed, setLocationDisplayed] = useState({
    WeatherText: "",
    celcius: 0,
    farenheit: 0,
  });
  const [forcast, setForcast] = useState([]);
  const [pictures, setPictures] = useState({
    cover: "",
    thumb: "",
  });

  // get weather on load
  useEffect(() => {
    setLoading(true);
    // getWeatherById(selectedPlace.id);
  }, [selectedPlace.id]);

  const getWeatherById = (id) => {
    let url = `http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&details=false`;
    axios
      .get(url)
      .then((res) => {
        let data = res.data[0];
        let temp = { ...locationDisplayed };
        temp.WeatherText = data.WeatherText;
        temp.celcius = data.Temperature.Metric.Value;
        temp.farenheit = data.Temperature.Imperial.Value;
        setLocationDisplayed(temp);

        getForcastWeather(id);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`${t("errors.placeIdCall")}`);
      });
  };

  const getForcastWeather = (id) => {
    let url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`;
    axios
      .get(url)
      .then((res) => {
        let data = res.data.DailyForecasts;
        let temp = [];
        data.forEach((element) => {
          temp.push({
            date: element.Date,
            weatherText: element.Day.IconPhrase,
          });
        });
        setForcast(temp);
        getLocationImages();
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`${t("errors.forcast")}`);
      });
  };

  const getLocationImages = () => {
    let query = selectedPlace.city;
    let url = process.env.REACT_APP_UNSPLASH_API_URL + query;

    axios
      .get(url)
      .then((res) => {
        if (res.data.results.length > 0) {
          let data = res.data.results[0].urls;
          let temp = { ...pictures };
          temp.cover = data.regular;
          temp.thumb = data.thumb;
          setPictures(temp);
        } else {
          let temp = { ...pictures };
          temp.cover = worldPic;
          temp.thumb = worldPic;
          setPictures(temp);
        }
      })
      .catch((error) => {
        toast.error(`${t("errors.image")}`);
      });
    setLoading(false);
  };

  const renderLoader = () => {
    let loader = <Loader />;
    if (!loading) {
      return null;
    }
    return loader;
  };

  return (
    <div className="Home">
      <SearchBox />

      {renderLoader()}

      {!loading && (
        <Slide left>
          <div
            className="location-wrapper"
            style={{ backgroundImage: `url(${pictures.cover})` }}
          >
            <CityBox data={locationDisplayed} />

            <Forcast data={forcast} />

            <LikeLocation thumbnail={pictures.thumb} />
          </div>
        </Slide>
      )}
    </div>
  );
};

export default Home;
