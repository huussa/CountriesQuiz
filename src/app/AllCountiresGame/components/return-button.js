import styles from "../page.module.css";
function ReturnButton() {
    return (
        <button 
            className={styles.nextQuestionButton}
            onClick={() => window.location.reload()}
        >
            Return
        </button>
    )
}
export default ReturnButton;