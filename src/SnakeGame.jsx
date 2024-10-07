import React, { useState, useEffect } from "react";
import "./SnakeGame.css";

const CELL_SIZE = 20;
const WIDTH = 400;
const HEIGHT = 400;

const getRandomPosition = () => {
  const x = Math.floor(Math.random() * (WIDTH / CELL_SIZE)) * CELL_SIZE;
  const y = Math.floor(Math.random() * (HEIGHT / CELL_SIZE)) * CELL_SIZE;
  return { x, y };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: CELL_SIZE * 2, y: CELL_SIZE * 2 }]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("Normal");

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x * CELL_SIZE,
      y: newSnake[0].y + direction.y * CELL_SIZE,
    };

    if (
      head.x >= WIDTH ||
      head.x < 0 ||
      head.y >= HEIGHT ||
      head.y < 0 ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setIsGameOver(true);
      setIsGameStarted(false);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      setFood(getRandomPosition());
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const getSpeed = () => {
    switch (difficulty) {
      case "Easy":
        return 300;
      case "Hard":
        return 100;
      default:
        return 200;
    }
  };

  useEffect(() => {
    if (isGameOver || !isGameStarted) return;
    const interval = setInterval(moveSnake, getSpeed());
    return () => clearInterval(interval);
  }, [snake, isGameOver, isGameStarted, difficulty]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isGameStarted) return;

      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, isGameStarted]);

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false);
  };

  const resetGame = () => {
    setSnake([{ x: CELL_SIZE * 2, y: CELL_SIZE * 2 }]);
    setFood(getRandomPosition());
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setIsGameOver(false);
    setIsGameStarted(false); // Set to false to show Start button after reset
  };

  const handleDirectionChange = (dir) => {
    if (!isGameStarted) return;

    switch (dir) {
      case "up":
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case "down":
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case "left":
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case "right":
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  return (
    <div className="game-container">
      <h1>Snake Game</h1>
      <div className="score">Score: {score}</div>
      <div
        className="board"
        style={{
          width: WIDTH,
          height: HEIGHT,
          position: "relative",
          backgroundColor: "#aad751",
          border: "2px solid #333",
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: "blue",
              position: "absolute",
              left: segment.x,
              top: segment.y,
            }}
          />
        ))}
        <div
          className="food"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: "red",
            position: "absolute",
            left: food.x,
            top: food.y,
          }}
        />
      </div>
      {isGameOver && (
        <div className="game-over">
          <p>Game Over</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
      {isGameStarted && !isGameOver && (
        <>
          <div className="controls">
            <button onClick={() => handleDirectionChange("up")}>▲</button>
            <div>
              <button onClick={() => handleDirectionChange("left")}>◀️</button>
              <button onClick={() => handleDirectionChange("down")}>▼</button>
              <button onClick={() => handleDirectionChange("right")}>▶️</button>
            </div>
          </div>
        </>
      )}
      {!isGameStarted && !isGameOver && (
        <>
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
          <select
            className="difficulty-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
          </select>
        </>
      )}
    </div>
  );
};

export default SnakeGame;
