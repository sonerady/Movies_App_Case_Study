import React from "react";
import styles from "./button.module.scss";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button
      className={`${styles.btn} ${props.className}`}
      onClick={props.onClick ? () => props.onClick : null}
    >
      {props.children}
    </button>
  );
};

export const OutlineButton = (props) => {
  return (
    <Button
      className={`${styles.btn_outline} ${props.className}`}
      onClick={props.onClick ? () => props.onClick : null}
    >
      {props.children}
    </Button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
