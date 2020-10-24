import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import * as actionTypes from "../../../store/actions";

// UI
import Input from "../../UI/Input";
import Select from "../../UI/Select/Select";

import "./SearchBox.scss";

const TEMP = [
  {
    Version: 1,
    Key: "210841",
    Type: "City",
    Rank: 20,
    LocalizedName: "Tehran",
    Country: {
      ID: "IR",
      LocalizedName: "Iran",
    },
    AdministrativeArea: {
      ID: "07",
      LocalizedName: "Tehran",
    },
  },
  {
    Version: 1,
    Key: "60592",
    Type: "City",
    Rank: 23,
    LocalizedName: "Tengzhou",
    Country: {
      ID: "CN",
      LocalizedName: "China",
    },
    AdministrativeArea: {
      ID: "SD",
      LocalizedName: "Shandong",
    },
  },
  {
    Version: 1,
    Key: "188046",
    Type: "City",
    Rank: 30,
    LocalizedName: "Tegucigalpa",
    Country: {
      ID: "HN",
      LocalizedName: "Honduras",
    },
    AdministrativeArea: {
      ID: "FM",
      LocalizedName: "Francisco Morazán",
    },
  },
  {
    Version: 1,
    Key: "45253",
    Type: "City",
    Rank: 31,
    LocalizedName: "Teresina",
    Country: {
      ID: "BR",
      LocalizedName: "Brazil",
    },
    AdministrativeArea: {
      ID: "PI",
      LocalizedName: "Piauí",
    },
  },
  {
    Version: 1,
    Key: "215854",
    Type: "City",
    Rank: 31,
    LocalizedName: "Tel Aviv",
    Country: {
      ID: "IL",
      LocalizedName: "Israel",
    },
    AdministrativeArea: {
      ID: "TA",
      LocalizedName: "Tel Aviv",
    },
  },
  {
    Version: 1,
    Key: "234337",
    Type: "City",
    Rank: 31,
    LocalizedName: "Tepic",
    Country: {
      ID: "MX",
      LocalizedName: "Mexico",
    },
    AdministrativeArea: {
      ID: "NAY",
      LocalizedName: "Nayarit",
    },
  },
  {
    Version: 1,
    Key: "246100",
    Type: "City",
    Rank: 32,
    LocalizedName: "Tetouan",
    Country: {
      ID: "MA",
      LocalizedName: "Morocco",
    },
    AdministrativeArea: {
      ID: "01",
      LocalizedName: "Tanger-Tétouan-Al Hoceïma",
    },
  },
  {
    Version: 1,
    Key: "61484",
    Type: "City",
    Rank: 33,
    LocalizedName: "Tengchong",
    Country: {
      ID: "CN",
      LocalizedName: "China",
    },
    AdministrativeArea: {
      ID: "YN",
      LocalizedName: "Yunnan",
    },
  },
  {
    Version: 1,
    Key: "3558994",
    Type: "City",
    Rank: 35,
    LocalizedName: "Tecámac",
    Country: {
      ID: "MX",
      LocalizedName: "Mexico",
    },
    AdministrativeArea: {
      ID: "MEX",
      LocalizedName: "México",
    },
  },
  {
    Version: 1,
    Key: "234828",
    Type: "City",
    Rank: 35,
    LocalizedName: "Tehuacán",
    Country: {
      ID: "MX",
      LocalizedName: "Mexico",
    },
    AdministrativeArea: {
      ID: "PUE",
      LocalizedName: "Puebla",
    },
  },
];

const SearchBox = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [results, setResults] = useState([]);
  const [selectOpen, setSelectOpen] = useState(false);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
    if (searchVal.length > 1) {
    //   getPlacesByQuery();
    }
  };

  const getPlacesByQuery = () => {
    setSelectOpen(true);
    console.log("im called");
    let url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&q=${searchVal}`;

    axios.get(url).then((res) => {
      setResults(res.data);
    })
    .catch((error) => {
      toast.error(`${t('errors.search')}`);
    });
  };

  const handleSelectedLoaction = (item) => {
    let id = item.Key;
    let city = item.LocalizedName;
    let country = item.Country.LocalizedName;

    setSelectOpen(false);

    dispatch({
      type: actionTypes.SET_SELECTED_PLACE,
      val: { id, city, country },
    });
  };

  return (
    <div className="SearchBox">
      <Input
        type="text"
        placeholder={t("home.searchBox.placeholder")}
        value={searchVal}
        onChange={handleChange}
      />

      {selectOpen && (
        <Select data={results} selected={handleSelectedLoaction} />
      )}
    </div>
  );
};

export default SearchBox;
