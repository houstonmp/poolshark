import styles from "./GameDiv.module.css";

const clickHandler = (event) => {
  console.log(event.currentTarget);
};

const GameDiv = (props) => {
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
