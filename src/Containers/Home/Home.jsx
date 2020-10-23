import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleGeoPermission } from "../../helper/userGeoLocation";

// components
import CityBox from "../../Components/Home/CityBox/CityBox";
import Forcast from "../../Components/Home/Forcast/Forcast";
import LikeLocation from "../../Components/Home/LikeLocation/LikeLocation";

// https://api.unsplash.com/search/photos/?client_id=qKMzxBGVJcSJDoVQ2lfZDBBae-wdjKhDI__UEMflJFo&query=rishon%20le%20zion

// style
import "./Home.scss";

const TEXT_CALL = [
  {
    Version: 1,
    Key: "215854",
    Type: "City",
    Rank: 31,
    LocalizedName: "Tel Aviv",
    EnglishName: "Tel Aviv",
    PrimaryPostalCode: "",
    Region: {
      ID: "MEA",
      LocalizedName: "Middle East",
      EnglishName: "Middle East",
    },
    Country: {
      ID: "IL",
      LocalizedName: "Israel",
      EnglishName: "Israel",
    },
    AdministrativeArea: {
      ID: "TA",
      LocalizedName: "Tel Aviv",
      EnglishName: "Tel Aviv",
      Level: 1,
      LocalizedType: "District",
      EnglishType: "District",
      CountryID: "IL",
    },
    TimeZone: {
      Code: "IDT",
      Name: "Asia/Jerusalem",
      GmtOffset: 3,
      IsDaylightSaving: true,
      NextOffsetChange: "2020-10-24T23:00:00Z",
    },
    GeoPosition: {
      Latitude: 32.045,
      Longitude: 34.77,
      Elevation: {
        Metric: {
          Value: 34,
          Unit: "m",
          UnitType: 5,
        },
        Imperial: {
          Value: 111,
          Unit: "ft",
          UnitType: 0,
        },
      },
    },
    IsAlias: false,
    SupplementalAdminAreas: [],
    DataSets: [
      "AirQualityCurrentConditions",
      "AirQualityForecasts",
      "Alerts",
      "ForecastConfidence",
    ],
  },
];

const ID_CALL = [
  {
    LocalObservationDateTime: "2020-10-22T03:26:00+03:00",
    EpochTime: 1603326360,
    WeatherText: "Mostly clear",
    WeatherIcon: 34,
    HasPrecipitation: false,
    PrecipitationType: null,
    IsDayTime: false,
    Temperature: {
      Metric: {
        Value: 22.9,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 73,
        Unit: "F",
        UnitType: 18,
      },
    },
    MobileLink:
      "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    Link:
      "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
  },
];

const FORCATS_CALL = {
  Headline: {
    EffectiveDate: "2020-10-24T08:00:00+03:00",
    EffectiveEpochDate: 1603515600,
    Severity: 4,
    Text: "Pleasant this weekend",
    Category: "mild",
    EndDate: null,
    EndEpochDate: null,
    MobileLink:
      "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us",
    Link:
      "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
  },
  DailyForecasts: [
    {
      Date: "2020-10-22T07:00:00+03:00",
      EpochDate: 1603339200,
      Temperature: {
        Minimum: {
          Value: 70,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 85,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 35,
        IconPhrase: "Partly cloudy",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
      Link:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
    },
    {
      Date: "2020-10-23T07:00:00+03:00",
      EpochDate: 1603425600,
      Temperature: {
        Minimum: {
          Value: 70,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 86,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 33,
        IconPhrase: "Clear",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
      Link:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
    },
    {
      Date: "2020-10-24T07:00:00+03:00",
      EpochDate: 1603512000,
      Temperature: {
        Minimum: {
          Value: 72,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 85,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 4,
        IconPhrase: "Intermittent clouds",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 34,
        IconPhrase: "Mostly clear",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
      Link:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
    },
    {
      Date: "2020-10-25T07:00:00+03:00",
      EpochDate: 1603598400,
      Temperature: {
        Minimum: {
          Value: 72,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 84,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 33,
        IconPhrase: "Clear",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
      Link:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
    },
    {
      Date: "2020-10-26T07:00:00+03:00",
      EpochDate: 1603684800,
      Temperature: {
        Minimum: {
          Value: 68,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 85,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 33,
        IconPhrase: "Clear",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
      Link:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
    },
  ],
};

const Home = () => {
  const [locationDisplayed, setLocationDisplayed] = useState({
    id: "215854",
    city: "Tel Aviv",
    country: "Israel",
    WeatherText: "",
    WeatherIcon: 0,
    celcius: 0,
    farenheit: 0,
    locationImg: "",
    locationThumbnail:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE3Njc3MH0",
  });
  const [forcast, setForcast] = useState([]);

  // get user geolocation if available
  useEffect(() => {
    let userCoordinates = handleGeoPermission();
    let telAvivId = 215854;

    if (userCoordinates.length > 0) {
      getWeatherByLocation(userCoordinates);
    } else {
      getWeatherById(telAvivId);
    }
  }, []);

  const getWeatherByLocation = (cordinates) => {
    console.log("coordinates", cordinates);
  };

  const getWeatherByText = () => {
    // rest call by name  - these are values to update..

    let data = TEXT_CALL[0];
    let temp = { ...locationDisplayed };
    temp.id = data.Key;
    temp.city = data.EnglishName;
    temp.country = data.Country.EnglishName;
    setLocationDisplayed(temp);
  };

  const getWeatherById = (id) => {
    // let url =
    //   `http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=qOJAIls3RAvpzohGoGeCJUdSu1lRWkhf&details=false`;
    // axios.get(url).then((res) => {
    //   console.log(res.data[0]);
    // });

    let data = ID_CALL[0];
    let temp = { ...locationDisplayed };
    temp.WeatherText = data.WeatherText;
    temp.WeatherIcon = data.WeatherIcon;
    temp.celcius = data.Temperature.Metric.Value;
    temp.farenheit = data.Temperature.Imperial.Value;
    setLocationDisplayed(temp);

    getForcastWeather(id);
  };

  const getForcastWeather = (id) => {
    // "http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=qOJAIls3RAvpzohGoGeCJUdSu1lRWkhf"

    let date = FORCATS_CALL.DailyForecasts;
    let temp = [];
    date.forEach((element) => {
      temp.push({
        date: element.Date,
        weatherText: element.Day.IconPhrase,
      });
    });
    setForcast(temp);
  };

  let img =
    "https://images.unsplash.com/photo-1500990702037-7620ccb6a60a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE3Njc3MH0";
  // let img = 'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE3Njc3MH0';

  return (
    <div className="Home" style={{ backgroundImage: `url(${img})` }}>
      <CityBox data={locationDisplayed} />

      <Forcast data={forcast} />

      <LikeLocation
        id={locationDisplayed.id}
        locationName={locationDisplayed.city}
        thumbnail={locationDisplayed.locationThumbnail}
      />
    </div>
  );
};

export default Home;
