import styles from "../page.module.css";

function QuestionCard({
  img,
  options,
  number,
  correctAnswer,
  selectedAnswer,
  isAnswered,
  onAnswer,
}) {
  const getButtonClass = (opt) => {
    if (!isAnswered) return "";
    if (opt.name === correctAnswer) return styles.true;
    if (opt.name === selectedAnswer.name) return styles.false;
    return "";
  };

  return (
    <div className={styles.card}>
      <h2>{number}. what is the name of this country?</h2>
      <img src={img.src} alt={img.alt} />
      {options.map((opt) => (
        <button
          key={opt.code}
          onClick={() => onAnswer(opt)}
          className={getButtonClass(opt)}
        >
          {opt.nameAr}
        </button>
      ))}
    </div>
  );
}

export default QuestionCard;
