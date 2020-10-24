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
  const selectedPlace = useSelector((state) => state.app.selectedPlace);
  const [liked, setLiked] = useState(false);

  // check if this place is a favorite
  useEffect(() => {
    if (favorites) {
      const isFavoritePlace = favorites.find(
        (place) => place.id === selectedPlace.id
      );
      if (isFavoritePlace) {
        setLiked(true);
      }
    }
  }, [selectedPlace.id, favorites]);

  const handleToggleLike = () => {
    if (liked) {
      dispatch({ type: actionTypes.RMV_FAVORITE });
    } else {
      dispatch({
        type: actionTypes.SET_FAVORITE,
        val: props.thumbnail,
      });
    }
    setLiked(!liked);
    toast.success(
      !liked ? t("home.likeBtn.likedText") : t("home.likeBtn.unLikedText")
    );
  };

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
