import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";

import FavoritePlace from "../../Components/Favorites/FavoritePlace/FavoritePlace";

import "./Favorites.scss";

// styled
const Title = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const NoPlaces = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
  font-weight: 400;
`;

const Favorites = () => {
  const { t } = useTranslation();
  const favorites = useSelector((state) => state.app.favorites);

  let favList = <NoPlaces>{t("favorites.noPlaces")}</NoPlaces>;
  if (favorites && favorites.length > 0) {
    favList = favorites.map((item, idx) => {
      return (
        <FavoritePlace
          id={item.id}
          city={item.city}
          country={item.country}
          thumbnail={item.thumbnail}
          key={idx}
        />
      );
    });
  }

  return (
    <div className="Favorites">
      <Title>{t("favorites.title")}</Title>
      <div className="favorites-list">{favList}</div>
    </div>
  );
};

export default Favorites;
