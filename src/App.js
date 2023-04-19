import "./styles.css";
import GameComponent from "./components/GameComponent";
import Navbar from "./components/Navbar";
import BottomImage from "./components/BottomImage";
import Modal from "./components/UI/Modal";

export default function App() {
  return (
    <div className="App">
      <Navbar />

      <h1>Tic-Tac-Toe</h1>
      <GameComponent></GameComponent>
    </div>
  );
}
