import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import styles from "./GameComponent.module.css";
import GameDiv from "./GameDiv";
import Modal from "./UI/Modal";
import VertBar from "./VertBar";

const GameComponent = () => {
  let [gameboard, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const modalObj = {
    title: "New Game",
    message: "Please enter player one's Name",
  };

  const [isNewGame, setNewGame] = useState(true);
  const [isVictory, setCondition] = useState(false);
  // const [currentLetter, setLetter] = useState("X");
  const [playerObj, setPlayer] = useState({
    player1: "Player 1",
    player2: "Player 2",
    currentPlayer: "Player 1",
    currentLetter: "X",
  });

  const [winner, setWinner] = useState("");

  useEffect(() => {
    const tempGameBoard = localStorage.getItem("gameBoard");
    const tempPlayer = localStorage.getItem("playerData");
    if (tempGameBoard && !isVictory) {
      setNewGame(false);
      console.log("Loading Game");
      setPlayer(JSON.parse(tempPlayer));
      setBoard(JSON.parse(tempGameBoard));
    } else {
      setNewGame(true);
    }
  }, []);

  const checkWin = (innerMap) => {
    for (let i = 0; i < innerMap.length; i++) {
      let checkVert = 0;
      let checkHor = 0;
      for (let j = 0; j < innerMap[0].length; j++) {
        if (innerMap[i][j] === playerObj.currentLetter) {
          ++checkVert;
        }
        if (innerMap[j][i] === playerObj.currentLetter) {
          ++checkHor;
        }
      }

      if (!isVictory && (checkVert === 3 || checkHor === 3)) {
        setCondition(true);
        setWinner(playerObj.currentPlayer);
      }
    }

    //Check > V Diags
    if (innerMap[0][0] === playerObj.currentLetter) {
      if (innerMap[1][1] === playerObj.currentLetter) {
        if (innerMap[2][2] === playerObj.currentLetter) {
          setCondition(true);
          setWinner(playerObj.currentPlayer);
        }
      }
    }
    //Check < V Diags
    if (innerMap[0][2] === playerObj.currentLetter) {
      if (innerMap[1][1] === playerObj.currentLetter) {
        if (innerMap[2][0] === playerObj.currentLetter) {
          setCondition(true);
          setWinner(playerObj.currentPlayer);
        }
      }
    }
  };

  const newGame = () => {
    localStorage.clear();
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };

  const startGameHandler = (e) => {
    e.preventDefault();
    if (e.target.children[1].value) {
      setPlayer({
        player1: e.target.children[1].value,
        player2: e.target.children[3].value,
        currentPlayer: e.target.children[1].value,
        currentLetter: "X",
      });
    } else {
      setPlayer({
        player1: "Player 1",
        player2: "Player 2",
        currentPlayer: "Player 1",
        currentLetter: "X",
      });
    }

    setCondition(false);
    setNewGame(false);
    newGame();
  };

  const onGameHandler = () => {
    setNewGame((prev) => !isNewGame);
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
              return playerObj.currentLetter;
            } else {
              return prev[outerIndex][innerIndex];
            }
          });
        });
        checkWin(innerMap);
        localStorage.setItem("gameBoard", JSON.stringify(innerMap));
        return innerMap;
      });
    }
    if (!isVictory) {
      if (playerObj.currentLetter === "X" && id) {
        console.log(playerObj.currentPlayer, isVictory);
        setPlayer((prev) => {
          let tempObj = {
            player1: prev.player1,
            player2: prev.player2,
            currentPlayer: prev.player2,
            currentLetter: "O",
          };
          localStorage.setItem("playerData", JSON.stringify(tempObj));
          return tempObj;
        });
      } else if (playerObj.currentLetter === "O") {
        console.log(playerObj.currentPlayer, isVictory);
        setPlayer((prev) => {
          let tempObj = {
            player1: prev.player1,
            player2: prev.player2,
            currentPlayer: prev.player1,
            currentLetter: "X",
          };
          localStorage.setItem("playerData", JSON.stringify(tempObj));
          return tempObj;
        });
      }
    }
  };

  return (
    <>
      {isNewGame && (
        <Modal title={modalObj.title} message={modalObj.message}>
          <form onSubmit={startGameHandler}>
            <label htmlFor="playerOne">Player 1</label>
            <input type="text" name="playerOne" />
            <label htmlFor="playerTwo">Player 2</label>
            <input type="text" name="playerTwo" />
            <footer>
              <button type="button" onClick={onGameHandler}>
                Close
              </button>
              <button type="submit">Submit</button>
            </footer>
          </form>
        </Modal>
      )}

      <section className={styles.board}>
        {gameboard.map((outerElement, outerIndex) => {
          return outerElement.map((innerElement, innerIndex) => {
            return (
              <div>
                <GameDiv
                  key={`${outerIndex}${innerIndex}${innerElement}${innerIndex}`}
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
        <h2>It's {playerObj.currentPlayer}'s turn to move.</h2>
      ) : (
        <h2>{winner} wins!</h2>
      )}
      <button className="newgame" onClick={onGameHandler}>
        new game
      </button>
    </>
  );
};

export default GameComponent;
