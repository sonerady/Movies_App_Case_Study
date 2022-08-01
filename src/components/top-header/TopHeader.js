import React from "react";

import styles from "./header.module.scss";

import bg from "../../assets/footer-bg.jpg";
import bgOther from "../../assets/bgOther.jpg";

import { useLocation } from "react-router-dom";

const TopHeader = (props) => {
  const { pathname } = useLocation();

  return (
    <div
      className={styles.page_header}
      style={{
        background: pathname === "/movie" ? `url(${bg})` : `url(${bgOther})`,
      }}
    >
      <h2>{props.children}</h2>
    </div>
  );
};

export default TopHeader;
