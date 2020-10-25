import React from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";

import NavLinks from "./NavLinks";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Drawer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 70%;
  background: ${({ theme }) => theme.sideDrawer};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding-top: 7rem;
  @media (min-width: 900px) {
    display: none;
  }
`;

const SideDrawer = (props) => {
  return (
    <Wrapper onClick={props.onClick}>
      <Fade left duration={500}>
        <Drawer onClick={(e) => e.stopPropagation()}>
          <NavLinks onClick={props.onClick} />
        </Drawer>
      </Fade>
    </Wrapper>
  );
};

export default SideDrawer;
