const DefeatScreen = ({ gameOver }) => {
  if (!gameOver) {
    return null;
  }

  const container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  };

  return (
    <div style={container}>
      <h1 style={{ color: "red" }}>YOU LOST</h1>
    </div>
  );
};

export default DefeatScreen;
