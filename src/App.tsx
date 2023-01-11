import { useState } from "react";
import "./css/App.css";
import GameGrid from "./GameGrid";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <GameGrid />
    </div>
  );
}

export default App;
