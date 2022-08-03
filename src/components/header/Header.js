import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { useRef } from "react";
import logo from "../../assets/example_logo.png";
import ThemeContext from "../../context/Theme";

import { useTranslation } from "react-i18next";

const Header = () => {
  const { isLanguage, setIsLanguage } = useContext(ThemeContext);
  const headerNav = [
    {
      name: localStorage.getItem("lng") === "tr" ? "Anasayfa" : "Home",
      path: "/",
    },
    {
      name:
        localStorage.getItem("lng") === "tr"
          ? "Populer Fimler"
          : "Popular Movies",
      path: "/movie",
    },
  ];

  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((item) => item.path == pathname);

  const { t, i18n } = useTranslation();

  const changeLanguage = async (lang) => {
    await i18n.changeLanguage(lang);
    await setIsLanguage(lang);
    await localStorage.setItem("lng", lang);
  };

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add(styles.shrink);
      } else {
        headerRef.current.classList.remove(styles.shrink);
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  });

  return (
    <div ref={headerRef} className={`${styles.header}`}>
      <div className={`${styles.header__wrap} container`}>
        <div className={`${styles.logo}`}>
          <img src={logo} alt="" />
          <Link to="/">{t("logo_text")}</Link>
        </div>

        <ul className={`${styles.header__nav}`}>
          {headerNav.map((item, index) => {
            return (
              <li
                key={index}
                className={`${index === active ? styles.active : ""}`}
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.language_button}>
          <button onClick={() => changeLanguage("en")}>EN</button>
          <button onClick={() => changeLanguage("tr")}>TR</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
