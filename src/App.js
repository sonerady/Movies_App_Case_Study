import "./App.scss";
import "swiper/swiper.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import RouteData from "./config/Route";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/Theme";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <RouteData />
      </Router>
    </ThemeProvider>
  );
}

export default App;
