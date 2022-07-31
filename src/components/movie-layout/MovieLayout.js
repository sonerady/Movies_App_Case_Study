import React, { useState, useEffect } from "react";
import styles from "./movieLayout.module.scss";
import MovieCard from "../../components/movie-card/MovieCard";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import { useParams } from "react-router-dom";

const MovieLayout = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();
  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.popular, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  return (
    <div className={styles.movie_grid}>
      {items.map((item, index) => {
        return <MovieCard key={index} category={props.category} item={item} />;
      })}
    </div>
  );
};

export default MovieLayout;
