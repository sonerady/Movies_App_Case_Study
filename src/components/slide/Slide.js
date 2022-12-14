import React, { useState, useEffect, useRef } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./slide.module.scss";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/movie-card/MovieCard";
import TopHeader from "../../components/top-header/TopHeader";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Slide = (props) => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  const link = "/" + "movie" + "/";

  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  const { t } = useTranslation();
  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(0, 1));
      } catch {}
    };
    getMovies();
  }, []);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
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
    <>
      <TopHeader>{t("upcoming_text")}</TopHeader>
      <div className="container">
        <div className={`${styles.movie_grid} section mb-3 `}>
          {items.map((item, index) => {
            return (
              <Link to={link + item.id}>
                <MovieCard key={index} category={props.category} item={item} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Slide;
