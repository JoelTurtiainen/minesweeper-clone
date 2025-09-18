const Timer = ({ time }) => {
  const timer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    gap: 5,
  };

  return (
    <div style={timer}>
      <button onClick={() => location.reload()}>restart</button>
      <div>Time: {time}</div>
    </div>
  );
};

export default Timer;
