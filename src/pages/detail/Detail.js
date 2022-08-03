import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { OutlineButton } from "../../components/button/Button";
import styles from "./detail.module.scss";
import CastList from "./components/CastList";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import localization from "moment/locale/tr";
import ThemeContext from "../../context/Theme";
import { useContext } from "react";

const Detail = () => {
  const { category, id } = useParams();
  const { isLanguage, setIsLanguage } = useContext(ThemeContext);
  const lang = isLanguage;
  const { t } = useTranslation();

  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} }, lang);
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id, lang]);

  const momentDetail = localStorage.getItem("lng") === "tr" ? "tr" : "En";

  let trLocale = require("moment/locale/tr");
  moment.locale(momentDetail, trLocale);

  const backButton = async () => {
    navigate(-1);
    setTimeout(() => {
      sessionStorage.removeItem("scrollPosition");
    }, 3000);
  };

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
            <div className={styles.top_content}>
              <h2>{item.title || item.name}</h2>
              <div onClick={backButton}>
                <OutlineButton>{t("back")}</OutlineButton>
              </div>
            </div>
            <span className={styles.dates}>
              {t("r_date")}{" "}
              {moment(item.release_date).locale(momentDetail).fromNow()}
            </span>
            <div className={styles.genres_wrapper}>
              {item.genres &&
                item.genres
                  .slice(0, 5)
                  .map((genre, i) => <span key={i}>{genre.name}</span>)}
            </div>
            <p>{item.overview ? item.overview : t("text_error")}</p>
            <h3>{t("casts")}</h3>
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
