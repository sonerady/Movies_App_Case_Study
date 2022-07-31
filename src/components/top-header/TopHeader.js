import React from "react";

import styles from "./header.module.scss";

import bg from "../../assets/footer-bg.jpg";

const TopHeader = (props) => {
  return (
    <div className={styles.page_header} style={{ background: `url(${bg})` }}>
      <h2>{props.children}</h2>
    </div>
  );
};

export default TopHeader;
