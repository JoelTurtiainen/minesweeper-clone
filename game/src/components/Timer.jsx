import styles from '../style.module.css'
const Timer = ({ time }) => {
  return (
    <div className={styles.timer}>
      <button onClick={() => location.reload()}>restart</button>
      <div>Time: {time}</div>
    </div>
  );
};

export default Timer;
