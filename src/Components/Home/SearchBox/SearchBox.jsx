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


const SearchBox = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [results, setResults] = useState([]);
  const [selectOpen, setSelectOpen] = useState(false);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
      getPlacesByQuery();
  };

  const getPlacesByQuery = () => {
    if(searchVal.length < 2) {
      return false
    }
    setSelectOpen(true);
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
        onBlur={() => setSelectOpen(false)}
      />

      {selectOpen && (
        <Select data={results} selected={handleSelectedLoaction} />
      )}
    </div>
  );
};

export default SearchBox;
