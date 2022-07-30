import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.scss";

const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div
      id={props.id}
      className={`${styles.modal} ${active ? styles.active : ""}  `}
    >
      {props.children}
    </div>
  );
};

export const ModalContent = (props) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove(styles.active);
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <div ref={contentRef} className={`${styles.modal__content}`}>
      {props.children}
      <div className={`${styles.modal__content__close}`} onClick={closeModal}>
        icon
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: PropTypes.func,
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export default Modal;
