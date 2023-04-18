import React, { useState, useEffect } from "react";
import styles from "./GameComponent.module.css";
import GameDiv from "./GameDiv";
import VertBar from "./VertBar";

const GameComponent = () => {
  let [gameboard, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  useEffect(() => {
    const tempGameBoard = localStorage.getItem("gameBoard");
    if (tempGameBoard) {
      console.log("Loading Game");
      setBoard(JSON.parse(tempGameBoard));
    }
  }, []);

  let [isVictory, setCondition] = useState(false);

  let [currentLetter, setLetter] = useState("X");

  const checkWin = (innerMap) => {
    for (let i = 0; i < innerMap.length; i++) {
      let checkVert = 0;
      let checkHor = 0;
      for (let j = 0; j < innerMap[0].length; j++) {
        if (innerMap[i][j] === currentLetter) {
          console.log(currentLetter);
          ++checkVert;
        }
        if (innerMap[j][i] === currentLetter) {
          ++checkHor;
        }
      }

      if (!isVictory && (checkVert === 3 || checkHor === 3)) {
        console.log("Check:", true);
        setCondition(true);
      }
    }
    //Check > V Diags
    if (innerMap[0][0] === currentLetter) {
      if (innerMap[1][1] === currentLetter) {
        if (innerMap[2][2] === currentLetter) {
          setCondition(true);
        }
      }
    }
    //Check < V Diags
    if (innerMap[0][2] === currentLetter) {
      if (innerMap[1][1] === currentLetter) {
        if (innerMap[2][0] === currentLetter) {
          setCondition(true);
        }
      }
    }
  };

  const newGame = () => {
    setLetter("X");
    setCondition(false);
    localStorage.clear();
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };

  const updateBoard = (id) => {
    if (gameboard[parseInt(id[0])][parseInt(id[1])] === "") {
      setBoard((prev) => {
        let innerMap = prev.map((outerElement, outerIndex) => {
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
        checkWin(innerMap);
        localStorage.setItem("gameBoard", JSON.stringify(innerMap));
        return innerMap;
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
                  isVictory={isVictory}
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
      {!isVictory ? (
        <h2>It's {currentLetter}'s turn to move.</h2>
      ) : (
        <h2>You win!</h2>
      )}
      <h3 className="newgame" onClick={newGame}>
        new game
      </h3>
    </div>
  );
};

export default GameComponent;
