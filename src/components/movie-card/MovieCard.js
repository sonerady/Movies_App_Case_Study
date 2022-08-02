import React, { useState } from "react";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import Button from "../button/Button";
import moment from "moment";
import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

const MovieCard = (props) => {
  const item = props.item;
  const [isHovered, setIsHovered] = useState(false);
  const link = "/" + "movie" + "/" + item.id;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  const { t } = useTranslation();

  const debouncedHandleMouseEnter = debounce(() => setIsHovered(true));

  const handlOnMouseLeave = () => {
    setIsHovered(false);
    debouncedHandleMouseEnter.cancel();
  };

  const momentDetail = localStorage.getItem("lng") === "tr" ? "Tr" : "En";

  return (
    <div
      onMouseLeave={handlOnMouseLeave}
      onMouseEnter={debouncedHandleMouseEnter}
      className={styles.wrapper}
    >
      <div>
        <div
          className={styles.movie_card}
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div
            className={styles.card_footer}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h3>{item.title || item.name}</h3>
            <span className={styles.release_date}>
              {t("r_date")}{" "}
              {moment(item.release_date).locale(momentDetail).fromNow()}
            </span>
            <span>
              <AiFillStar />
              {item.vote_average}
            </span>
          </div>
        </div>
      </div>
      {isHovered && <Link to={link}>{t("detail")}</Link>}
    </div>
  );
};

export default MovieCard;
