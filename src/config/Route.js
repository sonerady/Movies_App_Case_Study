import React from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog.js";
import Detail from "../pages/detail/Detail";

const RouteData = () => {
  const routes = useRoutes([
    { path: "/:category/search/:keyword", element: <Catalog /> },
    { path: "/:category/:id", element: <Detail /> },
    { path: "/:category", element: <Catalog /> },
    { path: "/", element: <Home /> },
  ]);
  return routes;
};

export default RouteData;
