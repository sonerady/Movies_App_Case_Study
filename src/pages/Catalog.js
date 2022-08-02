import React from "react";
import { useParams } from "react-router-dom";
import { category as cate } from "../api/tmdbApi";
import MovieLayout from "../components/movie-layout/MovieLayout";
import TopHeader from "../components/top-header/TopHeader";
import { useTranslation } from "react-i18next";

const Catalog = () => {
  const { category } = useParams();
  const { t } = useTranslation();

  return (
    <>
      <TopHeader>
        {category === cate.movie ? t("popular_movies") : "Upcoming Movies"}
      </TopHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieLayout category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
