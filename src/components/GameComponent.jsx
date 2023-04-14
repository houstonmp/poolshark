import React, { useState } from "react";
import styles from "./GameComponent.module.css";
import GameDiv from "./GameDiv";
import VertBar from "./VertBar";

const GameComponent = () => {
  let [gameboard, setBoard] = useState([
    ["1", "2", "3"],
    ["4", "", ""],
    ["7", "", "9"],
  ]);

  const clickHandler = (event) => {
    console.log(event.currentTarget.id);
  };

  return (
    <section className={styles.board}>
      {gameboard.map((outerElement, outerIndex) => {
        return outerElement.map((innerElement, innerIndex) => {
          return (
            <div>
              <GameDiv
                id={`${outerIndex}${innerIndex}`}
                value={innerElement}
                addPiece={clickHandler}
              />
            </div>
          );
        });
      })}
      <VertBar styling="neonbar_horizontal" />
      <VertBar styling="neonbar_horizontal" />
      <VertBar styling="neonbar_vertical" />
      <VertBar styling="neonbar_vertical" />
    </section>
  );
};

export default GameComponent;
