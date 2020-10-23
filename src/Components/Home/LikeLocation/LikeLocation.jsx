import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import * as actionTypes from "../../../store/actions";
import "./LikeLocation.scss";

import starOutline from "../../../images/star-ouline.svg";
import starFull from "../../../images/star-full.svg";

const LikeLocation = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const favorites = useSelector((state) => state.app.favorites);
  const [liked, setLiked] = useState(false);

  // check if this place is a favorite
  useEffect(() => {
    if (favorites) {
      const isFavoritePlace = favorites.find((place) => place.id === props.id);
      if (isFavoritePlace) {
        setLiked(true);
      }
    }
  }, [favorites]);

  const handleToggleLike = () => {
    if (liked) {
      dispatch({ type: actionTypes.RMV_FAVORITE, val: props.id });
    } else {
      dispatch({
        type: actionTypes.SET_FAVORITE,
        val: {
          id: props.id,
          locationName: props.locationName,
          thumbnail: props.thumbnail,
        },
      });
    }
    setLiked(!liked);
    toast(!liked ? t("home.likeBtn.likedText") : t("home.likeBtn.unLikedText"));
  };

  console.log(favorites);

  let star = starOutline;
  if (liked) {
    star = starFull;
  }

  return (
    <button className="like-btn" onClick={handleToggleLike}>
      <img src={star} alt="star icon" />
    </button>
  );
};

export default LikeLocation;
