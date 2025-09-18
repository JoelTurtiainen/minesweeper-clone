import { useState, useRef, useEffect } from "react";
import Display from "./components/Display";
import VictoryScreen from "./components/VictoryScreen";

const App = () => {
  const [field, setField] = useState([
    ["X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ]);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTime(s => s + 1);
    }, 1000);
  };

  useEffect(() => {
    if ((gameOver && intervalRef.current) || (gameWon && intervalRef.current)) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [gameOver, gameWon]);

  const generateMines = pos => {
    let mineCount = 10;
    let tempField = [];
    while (mineCount !== 0) {
      for (let n1 = 0; n1 < 9; n1++) {
        let row = [];
        for (let n2 = 0; n2 < 9; n2++) {
          let chance = Math.floor(Math.random() * 10);
          if (chance === 1 && mineCount > 0) {
            row.push({ value: "M", revealed: false });
            mineCount = mineCount - 1;
          } else {
            row.push({ value: 0, revealed: false });
          }
        }
        tempField.push(row);
      }
      if (mineCount === 0 && tempField[pos[0]][pos[1]].value !== "M") {
        detectMines(tempField, pos);
      } else {
        mineCount = 10;
        tempField = [];
      }
    }
  };

  const detectMines = (currField, pos) => {
    let tempField = currField;
    let rowNum = 0;
    for (let row of tempField) {
      let cellNum = 0;
      for (let cell of row) {
        if (cell.value !== "M") {
          let adjacentMines = 0;
          if (
            rowNum !== 0 &&
            cellNum !== 0 &&
            tempField[rowNum - 1][cellNum - 1].value === "M"
          ) {
            adjacentMines = adjacentMines + 1;
          }
          if (rowNum !== 0 && tempField[rowNum - 1][cellNum].value === "M") {
            adjacentMines = adjacentMines + 1;
          }
          if (
            rowNum !== 0 &&
            cellNum !== 8 &&
            tempField[rowNum - 1][cellNum + 1].value === "M"
          ) {
            adjacentMines = adjacentMines + 1;
          }
          if (cellNum !== 0 && tempField[rowNum][cellNum - 1].value === "M") {
            adjacentMines = adjacentMines + 1;
          }
          if (cellNum !== 8 && tempField[rowNum][cellNum + 1].value === "M") {
            adjacentMines = adjacentMines + 1;
          }
          if (
            rowNum !== 8 &&
            cellNum !== 0 &&
            tempField[rowNum + 1][cellNum - 1].value === "M"
          ) {
            adjacentMines = adjacentMines + 1;
          }
          if (rowNum !== 8 && tempField[rowNum + 1][cellNum].value === "M") {
            adjacentMines = adjacentMines + 1;
          }
          if (
            rowNum !== 8 &&
            cellNum !== 8 &&
            tempField[rowNum + 1][cellNum + 1].value === "M"
          ) {
            adjacentMines = adjacentMines + 1;
          }
          cell.value = adjacentMines;
        }
        cellNum = cellNum + 1;
      }
      rowNum = rowNum + 1;
    }
    revealCell(pos, tempField);
    setField(tempField);
  };

  const revealCell = (pos, optField) => {
    let updatedField;
    const r = pos[0];
    const c = pos[1];

    if (!optField) {
      updatedField = JSON.parse(JSON.stringify(field));
    } else {
      updatedField = optField;
    }

    if (updatedField[r][c].value === 0) {
      floodFill(r, c, updatedField);
    }

    updatedField[r][c] = {
      ...updatedField[r][c],
      revealed: true,
    };

    checkForWin(updatedField);
    setField(updatedField);
  };

  const floodFill = (r, c, field) => {
    const Que = [];
    Que.push([r, c]);
    while (Que.length !== 0) {
      const [row, col] = Que.shift();
      let cell = field[row][col];
      if (cell.value === 0 && !cell.revealed) {
        cell.revealed = true;
        if (col > 0) Que.push([row, col - 1]);
        if (col < 8) Que.push([row, col + 1]);
        if (col > 0 && row > 0) Que.push([row - 1, col - 1]);
        if (col < 8 && row > 0) Que.push([row - 1, col + 1]);
        if (col > 0 && row < 8) Que.push([row + 1, col - 1]);
        if (col < 8 && row < 8) Que.push([row + 1, col + 1]);
        if (row > 0) Que.push([row - 1, col]);
        if (row < 8) Que.push([row + 1, col]);
      } else {
        cell.revealed = true;
      }
    }
  };

  const checkForWin = tempField => {
    const win = 71;
    let revealed = 0;
    tempField.map(row => {
      row.map(cell => {
        if (cell.revealed && cell.value !== "M") revealed = revealed + 1;
      });
    });
    if (revealed === win && !gameOver) {
      revealEveryCell(tempField);
      setGameWon(true);
    }
  };

  const revealEveryCell = optField => {
    let tempField;

    if (!optField) {
      tempField = JSON.parse(JSON.stringify(field));
    } else {
      tempField = optField;
    }
    tempField.map(row => {
      row.map(cell => (cell.revealed = true));
    });
    setField(tempField);
  };

  return (
    <>
      <Display
        generateMines={generateMines}
        field={field}
        revealCell={revealCell}
        gameOver={gameOver}
        setGameOver={setGameOver}
        time={time}
        startTimer={startTimer}
        revealEveryCell={revealEveryCell}
        gameWon={gameWon}
      />
      <VictoryScreen time={time} gameWon={gameWon} />
    </>
  );
};

export default App;
