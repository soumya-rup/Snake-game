import React from "react";
import SnakeGame from "./SnakeGame";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1 className="game-title"></h1>
      <SnakeGame />
    </div>
  );
};

export default App;
