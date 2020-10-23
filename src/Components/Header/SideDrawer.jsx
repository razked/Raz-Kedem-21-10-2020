import React from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

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

  .slide-in-left-enter {
    transform: translateX(-100%);
  }

  .slide-in-left-enter-active {
    transform: translateX(0);
    opacity: 1;
    transition: all 200ms;
  }

  .slide-in-left-exit {
    transform: translateX(0%);
    opacity: 1;
  }

  .slide-in-left-exit-active {
    transform: translateX(-100%);
    opacity: 0;
    transition: all 200ms;
  }
`;

const SideDrawer = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <Wrapper onClick={props.onClick}>
        <Drawer onClick={(e) => e.stopPropagation()}>
          <NavLinks onClick={props.onClick} />
        </Drawer>
      </Wrapper>
    </CSSTransition>
  );
};

export default SideDrawer;
