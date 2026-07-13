import styles from "../page.module.css"

function Timer({totalSeconds}){
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return (
    <div className={styles.timer}>
        {`${minutes}:${seconds}`}
    </div>
  );
};
export default Timer