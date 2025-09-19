import styles from '../style.module.css'

const DefeatScreen = ({ gameOver }) => {
  if (!gameOver) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 style={{ color: "red" }}>YOU LOST</h1>
    </div>
  );
};

export default DefeatScreen;
