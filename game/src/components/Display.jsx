import { useState } from "react";
import Cell from "./Cell";

const Display = ({ generateMines, field, revealCell }) => {
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
          return "yellow";
        case 6:
          return "cyan";
        case 7:
          return "gray";
        case 8:
          return "black";
      }
    }
  };

  const style = {
    height: "25px",
    width: "25px",
    display: "inline-block",
    verticalAlign: "top",
  };

  return (
    <>
      {field.map((row, rIndex) => (
        <div style={style} key={rIndex}>
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
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Display;
