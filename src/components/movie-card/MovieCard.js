import React from "react";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";
import Button from "../button/Button";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const MovieCard = (props) => {
  const item = props.item;

  const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div
        className={styles.movie_card}
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Button>icon</Button>
        <h3>{item.title || item.name}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
