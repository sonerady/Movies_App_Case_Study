import React from "react";
import { useParams } from "react-router-dom";
import { category as cate } from "../api/tmdbApi";
import MovieLayout from "../components/movie-layout/MovieLayout";
import TopHeader from "../components/top-header/TopHeader";

const Catalog = () => {
  const { category } = useParams();

  return (
    <>
      <TopHeader>
        {category === cate.movie ? "Populer Movies" : "Upcoming Movies"}
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
