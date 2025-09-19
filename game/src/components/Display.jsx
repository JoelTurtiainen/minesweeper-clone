import { useState, useRef, useEffect } from "react";
import Cell from "./Cell";
import Timer from "./Timer";
import DefeatScreen from "./DefeatScreen";
import styles from '../style.module.css'


const Display = ({
  generateMines,
  field,
  revealCell,
  gameOver,
  setGameOver,
  time,
  startTimer,
  revealEveryCell,
  gameWon,
}) => {
  const [initialClick, setInitialClick] = useState(true);

  const determineColor = cell => {
    if (cell.revealed) {
      switch (cell.value) {
        case 0:
          return "lightgray";
        case 1:
          return "blue";
        case 2:
          return "green";
        case 3:
          return "red";
        case 4:
          return "purple";
        case 5:
          return "orange";
        case 6:
          return "cyan";
        case 7:
          return "gray";
        case 8:
          return "black";
      }
    }
  };

  return (
    <>
      <div>
        <Timer time={time} />
      </div>
      <div className={styles.container}>
        {field.map((row, rIndex) => (
          <div className={styles.display} key={rIndex}>
            {row.map((cell, cIndex) => (
              <Cell
                key={cIndex}
                generateMines={generateMines}
                color={determineColor(cell)}
                cell={cell}
                initialClick={initialClick}
                setInitialClick={setInitialClick}
                revealCell={revealCell}
                pos={[rIndex, cIndex]}
                startTimer={startTimer}
                setGameOver={setGameOver}
                revealEveryCell={revealEveryCell}
                gameWon={gameWon}
              />
            ))}
          </div>
        ))}
      </div>
      <DefeatScreen gameOver={gameOver} />
    </>
  );
};

export default Display;
