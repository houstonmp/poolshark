import "./styles.css";
import GameComponent from "./components/GameComponent";
import Navbar from "./components/Navbar";
import BottomImage from "./components/BottomImage";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>Tic-Tac-Toe</h1>
      <GameComponent></GameComponent>
      <h2>It's O's turn to move.</h2>
      <h3 className="newgame">new game</h3>
      <BottomImage />
    </div>
  );
}
