import { useState } from "react";
const Form = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    if (e.target.children[0].value) {
      props.startGameHandler({
        player1: e.target.children[0].value,
        player2: e.target.children[1].value,
        currentPlayer: e.target.children[0].value,
        currentLetter: "X",
      });
    } else {
      props.startGameHandler({
        player1: "Player 1",
        player2: "Player 2",
        currentPlayer: "Player 1",
        currentLetter: "X",
      });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="playerOne"
        placeholder="Player 1"
        className="player-input"
      />
      <input
        placeholder="Player 2"
        type="text"
        name="playerTwo"
        className="player-input"
      />
      <footer>
        <button type="button" onClick={props.onGameHandler}>
          Close
        </button>
        <button type="submit">Submit</button>
      </footer>
    </form>
  );
};

export default Form;
