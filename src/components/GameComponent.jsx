import React, { useState } from "react";
import styles from "./GameComponent.module.css";
import GameDiv from "./GameDiv";
import VertBar from "./VertBar";

const GameComponent = () => {
  let [gameboard, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  let [currentLetter, setLetter] = useState("X");

  const newGame = () => {
    setLetter("X");
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };

  const updateBoard = (id) => {
    console.log("In updateBoard:", id);
    if (gameboard[parseInt(id[0])][parseInt(id[1])] === "") {
      setBoard((prev) => {
        return prev.map((outerElement, outerIndex) => {
          return outerElement.map((innerElement, innerIndex) => {
            if (
              outerIndex === parseInt(id[0]) &&
              innerIndex === parseInt(id[1])
            ) {
              return currentLetter;
            } else {
              return prev[outerIndex][innerIndex];
            }
          });
        });
      });
      if (currentLetter === "X") {
        setLetter("O");
      } else {
        setLetter("X");
      }
    }
  };

  return (
    <div>
      <section className={styles.board}>
        {gameboard.map((outerElement, outerIndex) => {
          return outerElement.map((innerElement, innerIndex) => {
            return (
              <div>
                <GameDiv
                  id={`${outerIndex}${innerIndex}`}
                  value={innerElement}
                  updateBoard={updateBoard}
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
      <h2>It's {currentLetter}'s turn to move.</h2>
      <h3 className="newgame" onClick={newGame}>
        new game
      </h3>
    </div>
  );
};

export default GameComponent;
