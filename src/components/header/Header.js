import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { useRef } from "react";
import logo from "../../assets/example_logo.png";

const headerNav = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Populer Movies",
    path: "/movie",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((item) => item.path === pathname);

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
          <Link to="/">Study Case</Link>
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
      </div>
    </div>
  );
};

export default Header;
