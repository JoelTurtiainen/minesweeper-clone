import minePNG from "./images/rg1024_sea_mine.svg";
import grayCell from "./images/B6B4B2_1200x.png";

const Cell = ({
  generateMines,
  color,
  cell,
  initialClick,
  setInitialClick,
  revealCell,
  pos,
  startTimer,
  setGameOver,
  revealEveryCell,
  gameWon,
}) => {
  const handleClick = () => {
    if (initialClick) {
      handleInitialClick();
      return;
    }
    revealCell(pos);
    if (cell.value === "M" && !gameWon) {
      revealEveryCell();
      setGameOver(true);
    }
  };

  const handleInitialClick = () => {
    generateMines(pos);
    setInitialClick(false);
    startTimer();
  };

  const mineImgStyle = {
    height: "15px",
    width: "10px",
    display: "inline-block",
    verticalAlign: "top",
  };

  const grayCellStyle = {
    height: "15px",
    width: "10px",
    display: "inline-block",
    verticalAlign: "top",
    backgroundColor: "green",
  };

  return (
    <>
      <button
        style={{
          backgroundColor: !cell.revealed ? "#b6b4b2" : null,
          color: cell === "X" ? null : color,
        }}
        onClick={() => handleClick()}
      >
        {!cell.revealed ? (
          <img style={grayCellStyle} src={grayCell} />
        ) : cell.value !== "M" ? (
          cell.value
        ) : (
          <img style={mineImgStyle} src={minePNG} />
        )}
      </button>
    </>
  );
};

export default Cell;
