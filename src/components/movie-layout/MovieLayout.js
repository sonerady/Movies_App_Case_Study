import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./movieLayout.module.scss";
import MovieCard from "../../components/movie-card/MovieCard";
import Button, { OutlineButton } from "../../components/button/Button";
import InfiniteScroll from "react-infinite-scroller";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import { useParams } from "react-router-dom";
import Input from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
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
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
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
          console.log("params", params);
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
  });
  return (
    <>
      <div className=" mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className={styles.movie_grid}>
        {items.map((item, index) => {
          return (
            <MovieCard key={index} category={props.category} item={item} />
          );
        })}
      </div>
      {page < totalPage && (
        <div onClick={loadMore} className={styles.movie_grid__loadmore}>
          <OutlineButton className={styles.small}>Load More</OutlineButton>
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
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className={styles.small} onClick={goToSearch}>
        Search
      </button>
    </div>
  );
};

export default MovieLayout;
