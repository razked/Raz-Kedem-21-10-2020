import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// style
const Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  margin-right: 1rem;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 3rem;
  }

  a {
    text-decoration: none;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.text};
    transition: opacity 0.2s ease;
    opacity: 0.7;
    font-weight: 600;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease;
    }

    &.active {
      opacity: 1;
    }
  }
`;


const NavLinks = props => {
  const { t } = useTranslation();

  let linksArr = [
    { text: t("header.nav.home"), url: "/" },
    { text: t("header.nav.favorites"), url: "/favorites" },
  ];

  const links = linksArr.map((item, idx) => {
    return (
      <NavLink to={item.url} key={idx} exact onClick={props.onClick}>
        {item.text}
      </NavLink>
    );
  });

  return <Wrapper>{links}</Wrapper>;
};

export default NavLinks;
