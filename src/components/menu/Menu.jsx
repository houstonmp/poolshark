const Menu = (props) => {
  const clickHandler = (event) => {
    props.onSelection(event.target.id);
  };

  return (
    <section>
      <h2>Choose a Game:</h2>
      <h3 id="tictactoe" onClick={clickHandler}>
        Tic-Tac-Toe
      </h3>
    </section>
  );
};

export default Menu;
