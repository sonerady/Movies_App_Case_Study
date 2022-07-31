import React, { useState, useEffect, useRef } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./slide.module.scss";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import { useHistory } from "react-router";

const Slide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

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

  return (
    <div className={`${styles.slide}`}>
      <div>
        {movieItems.map((item, index) => {
          return (
            <div className={styles.wrapper} key={index}>
              <img src={apiConfig.originalImage(item.backdrop_path)} />
              <div className={styles.content}>
                <div className={styles.content_texts}>
                  <h1>Thor: Love and Thunder</h1>
                  <span>
                    Thor: Love and Thunder does attempt to explore themes of
                    love and loss whilst introducing the Mighty Thor and putting
                    Thor on a journey of self discovery.
                  </span>
                  <div className={styles.button_wrapper}>
                    <button>All Movies</button>
                    <button>Populer Movies</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slide;
