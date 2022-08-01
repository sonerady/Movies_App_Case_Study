import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import styles from "./detail.module.scss";
import CastList from "./components/CastList";

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <div className={styles.container}>
          <div
            className={styles.banner}
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className={styles.content_wrapper}>
            <h2>{item.title || item.name}</h2>
            <span className={styles.dates}>
              Release Date: {moment(item.release_date).fromNow()}
            </span>
            <div className={styles.genres_wrapper}>
              {item.genres &&
                item.genres
                  .slice(0, 5)
                  .map((genre, i) => <span key={i}>{genre.name}</span>)}
            </div>
            <p>{item.overview}</p>
            <h3>Casts</h3>
            <div>
              <CastList id={item.id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
