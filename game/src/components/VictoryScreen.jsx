const VictoryScreen = ({ time, gameWon }) => {
  if (!gameWon) {
    return null;
  }

  const container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
    color: "green",
    fontSize: "50px",
  };

  return <div style={container}>You beat the game in {time} seconds!</div>;
};

export default VictoryScreen;
