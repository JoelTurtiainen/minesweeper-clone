const Cell = ({
  generateMines,
  color,
  cell,
  initialClick,
  setInitialClick,
  revealCell,
  pos,
}) => {
  const handleClick = () => {
    if (initialClick) {
      handleInitialClick();
      return;
    }
    revealCell(pos);
    console.log(cell);
    if (cell.value === "M") {
      window.alert("U LOST");
      return location.reload();
    }
  };

  const handleInitialClick = () => {
    generateMines(pos);
    setInitialClick(false);
  };

  return (
    <>
      <button
        style={{ color: cell === "X" ? "black" : color }}
        onClick={() => handleClick()}
      >
        {cell.revealed ? cell.value : "X"}
      </button>
    </>
  );
};

export default Cell;
