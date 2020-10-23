import React from "react";
import axios from "axios";
import styled from "styled-components";
import "./FavoritePlace.scss";

// styled
const Title = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 1.6rem;
  font-weight: 600;
`;

const FavoritePlace = (props) => {
  const { id, thumbnail, locationName } = props;

  return (
    <div className="FavoritePlace">
      <div
        className="thumbnail"
        style={{ backgroundImage: `url(${thumbnail})` }}
      ></div>

      <Title>{locationName}</Title>
    </div>
  );
};

export default FavoritePlace;
