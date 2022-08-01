import React from "react";
import { Routes, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog.js";
import Detail from "../pages/detail/Detail";

const RouteData = () => {
  return (
    <Routes>
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id" element={<Detail />} />
      <Route path="/:category" element={<Catalog />} />
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
};

export default RouteData;
