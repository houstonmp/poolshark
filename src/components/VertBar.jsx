import styles from "./GameComponent.module.css";

const VertBar = (props) => {
  return <hr className={`${styles[props.styling]}`}></hr>;
};

export default VertBar;
