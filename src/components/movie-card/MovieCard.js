import React, { useState } from "react";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import moment from "moment";
import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { debounce } from "lodash";

const MovieCard = (props) => {
  const item = props.item;
  console.log(item);
  const [isHovered, setIsHovered] = useState(false);
  const link = "/" + "movie" + "/" + item.id;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  const debouncedHandleMouseEnter = debounce(() => setIsHovered(true));

  const handlOnMouseLeave = () => {
    setIsHovered(false);
    debouncedHandleMouseEnter.cancel();
  };

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
          <div className={styles.card_footer}>
            <h3>{item.title || item.name}</h3>
            <span className={styles.release_date}>
              R. date : {moment(item.release_date).fromNow()}
            </span>
          </div>
        </div>
      </div>
      {isHovered && <Link to={link}>Detail</Link>}
    </div>
  );
};

export default MovieCard;
