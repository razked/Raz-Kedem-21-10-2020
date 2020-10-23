import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as actionTypes from "../../store/actions";


// images
import bulbOn from "../../images/bulb-on.svg";
import bulbOff from "../../images/bulb-off.svg";

// style
const Button = styled.button`
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 3rem;
    transform: translateY(-.3rem);
  }
`;

const ThemeToggleBtn = () => {
  const dispatch = useDispatch();
  const ThemeLight = useSelector((state) => state.app.themeLight);

  const themeToggler = () => {
    dispatch({ type: actionTypes.TOGGLE_THEME });
  };

  const handleBulbImg = () => {
    let imgSrc = bulbOn;
    if (!ThemeLight) {
      imgSrc = bulbOff;
    }
    return imgSrc;
  };

  return (
    <Button onClick={themeToggler}>
      <img src={handleBulbImg()} alt="theme change icon" />
    </Button>
  );
};

export default ThemeToggleBtn;
