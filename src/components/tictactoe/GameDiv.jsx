import React, { useState } from "react";

import styles from "./GameDiv.module.css";

const GameDiv = (props) => {
  const [location, setLocation] = useState("");

  const clickHandler = (event) => {
    if (!props.isVictory) {
      props.updateBoard(event.currentTarget.id.split(""));
    }
  };

  return (
    <div
      key={props.id}
      id={props.id}
      onClick={clickHandler}
      className={styles.gameDiv}
    >
      <h2 className={styles.gamepiece}>{props.value}</h2>
    </div>
  );
};

export default GameDiv;
