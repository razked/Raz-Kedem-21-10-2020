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
`;

const NoPlaces = styled.span`
color: ${({ theme }) => theme.text};
font-size: 2rem;
font-weight: 600;
`;

const Favorites = () => {
  const { t } = useTranslation();
  const favorites = useSelector((state) => state.app.favorites);
  console.log(favorites);


  let favList = <NoPlaces>{t('favorites.noPlaces')}</NoPlaces>
  if (favorites && favorites.length > 0) {
    favList = favorites.map((item, idx) => {
      return (
        <FavoritePlace
          locationName={item.locationName}
          id={item.id}
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
