import React, { useState, useEffect } from "react";
import styles from "./movieLayout.module.scss";
import MovieCard from "../../components/movie-card/MovieCard";

const MovieLayout = () => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState(0);

  return <div>MovieLayout</div>;
};

export default MovieLayout;
