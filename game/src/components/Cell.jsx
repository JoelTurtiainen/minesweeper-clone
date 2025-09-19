import minePNG from "./images/rg1024_sea_mine.svg";
import grayCell from "./images/B6B4B2_1200x.png";
import styles from '../style.module.css'

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
          <img className={styles.grayCellStyle} src={grayCell} />
        ) : cell.value !== "M" ? (
          cell.value
        ) : (
          <img className={styles.mineImgStyle} src={minePNG} />
        )}
      </button>
    </>
  );
};

export default Cell;
