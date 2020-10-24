import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as actionTypes from "../../store/actions";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// images
import tempLight from "../../images/temp-light.svg";
import tempDark from "../../images/temp-dark.svg";

// style
const Button = styled.button`
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  img {
    width: 100%;
    height: 3rem;
  }
`;

const ThemeToggleBtn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ThemeLight = useSelector((state) => state.app.themeLight);
  const celcius = useSelector((state) => state.app.celcius);

  const tempatureToggler = () => {
    dispatch({ type: actionTypes.TOGGLE_TEMP });
    toast.info(celcius ? t("header.celciusAlert") : t("header.FarenheitAlert"));
  };

  const handleTempImg = () => {
    let imgSrc = tempLight;
    if (!ThemeLight) {
      imgSrc = tempDark;
    }
    return imgSrc;
  };

  return (
    <Button onClick={tempatureToggler}>
      <img src={handleTempImg()} alt="termometer icon" />
    </Button>
  );
};

export default ThemeToggleBtn;
