import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./movieLayout.module.scss";
import MovieCard from "../../components/movie-card/MovieCard";
import Button, { OutlineButton } from "../../components/button/Button";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import { useParams } from "react-router-dom";
import Input from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { t } from "i18next";
import { Link } from "react-router-dom";

const MovieLayout = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState(0);

  const link = "/" + "movie" + "/";

  const { keyword } = useParams();

  const [urlNumber, setUrlNumber] = useState();

  const [sortBy, setSortBy] = useState("asc_popularity");

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

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
            response = await tmdbApi.getMoviesList(movieType.top_rated, {
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
  }, [props.category, keyword, sortBy]);

  const loadMore = async () => {
    sessionStorage.setItem("page", true);
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };

      setUrlNumber(params);
      navigate(`/${category[props.category]}`);

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
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  useEffect(() => {
    const onScroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMore();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const sortedItems =
    (sortBy === "" && items) ||
    (sortBy === "desc_popularity" &&
      items.sort((a, b) => a.popularity - b.popularity)) ||
    (sortBy === "asc_popularity" &&
      items.sort((a, b) => b.popularity - a.popularity)) ||
    (sortBy === "dec_average" &&
      items.sort((a, b) => a.vote_average - b.vote_average)) ||
    (sortBy === "inc_average" &&
      items.sort((a, b) => b.vote_average - a.vote_average));

  useEffect(() => {
    if (items.length) {
      const scrollPosition = sessionStorage.getItem("scrollPosition");
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
      }
      if (urlNumber === page) {
        sessionStorage.removeItem("scrollPosition");
      }
    }
  });

  window.onunload = function () {
    sessionStorage.removeItem("scrollPosition");
  };

  return (
    <>
      <div className=" mb-3">
        <MovieSearch
          t={t}
          category={props.category}
          setSortBy={setSortBy}
          sortBy={sortBy}
          keyword={keyword}
        />
      </div>

      <div className={styles.movie_grid}>
        {sortedItems.map((item, index) => {
          return (
            <Link
              to={link + item.id}
              onClick={() =>
                sessionStorage.setItem("scrollPosition", window.pageYOffset)
              }
            >
              <MovieCard
                param
                key={index}
                category={props.category}
                item={item}
              />
            </Link>
          );
        })}
      </div>
      {page < totalPage && (
        <div onClick={loadMore} className={styles.movie_grid__loadmore}>
          <OutlineButton className={styles.small}>
            {t("load_more")}
          </OutlineButton>
        </div>
      )}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className={styles.movie_search}>
      <Input
        type="text"
        placeholder={t("enter_keyword")}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className={styles.small} onClick={goToSearch}>
        {t("search")}
      </button>
      <select
        onChange={(e) => {
          props.setSortBy(e.target.value);
        }}
        className={styles.small}
      >
        <option value="asc_popularity">{t("asc_popularity")}</option>
        <option value="desc_popularity">{t("desc_popularity")}</option>
        <option value="inc_average">{t("inc_vote_average")}</option>
        <option value="dec_average">{t("dec_vote_average")}</option>
      </select>
    </div>
  );
};

export default MovieLayout;
