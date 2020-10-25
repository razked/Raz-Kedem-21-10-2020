import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// components
import SideDrawer from "../../Components/Header/SideDrawer";
import NavLinks from "../../Components/Header/NavLinks";
import Hamburger from "../../Components/UI/Hamburger/Hamburger";
import ThemeToggleBtn from "../../Components/Header/ThemeToggleBtn";
import TempatureToggle from "../../Components/Header/TempatureToggle";

// style
const HeaderDiv = styled.header`
  width: 100%;
  height: 12vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AppTitle = styled.div`
  a {
    font-size: 3rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
  }
`;

const WrapperLinks = styled.div`
  display: inline-flex;
  @media (max-width: 900px) {
    display: none;
  }
`;

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

const WrapperActionBtns = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1.5rem;
  border-left: 1px solid;
  border-color: ${({ theme }) => theme.borderHeader};
  gap: 0.5rem;
  @media (max-width: 900px) {
    border: none;
  }
`;

const Header = () => {
  const { t } = useTranslation();
  const [drawerToggle, setDrawerToggle] = useState(false);

  return (
    <React.Fragment>
      {drawerToggle && (
        <SideDrawer onClick={() => setDrawerToggle(!drawerToggle)} />
      )}

      <HeaderDiv>
        <WrapperDiv>
          <Hamburger
            onClick={() => setDrawerToggle(!drawerToggle)}
            active={drawerToggle}
          />
          <AppTitle>
            <Link to="/">{t("header.appName")}</Link>
          </AppTitle>
        </WrapperDiv>

        <WrapperDiv>
          <WrapperLinks>
            <NavLinks />
          </WrapperLinks>

          <WrapperActionBtns>
            <ThemeToggleBtn />
            <TempatureToggle />
          </WrapperActionBtns>
        </WrapperDiv> 
      </HeaderDiv>
    </React.Fragment>
  );
};

export default Header;
