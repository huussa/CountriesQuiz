import styles from "../page.module.css";

function QuestionCard({
  flag,
  options,
  number,
  correctAnswer,
  selectedAnswer,
  isAnswered,
  onAnswer,
}) {
  const countryNames = new Intl.DisplayNames(["ar"], {
    type: "region",
  });
  const specialNames = {
    HK: "هونغ كونغ",
    MM: "بورما",
    TL: "تيمور",
    CD: "جمهورية الكونقو",
  };
  return (
    <div className={styles.card}>
      <h2>{number}. what is the name of this country?</h2>
      <img src={flag} alt="country flag" />
      {options.map((opt) => (
        <button
          key={opt.code}
          onClick={() => onAnswer(opt)}
          className={
            isAnswered
              ? opt.name === correctAnswer
                ? styles.true
                : opt.name === selectedAnswer.name
                  ? styles.false
                  : ""
              : ""
          }
        >
          {specialNames[opt.code] || countryNames.of(opt.code) || opt.name}
        </button>
      ))}
    </div>
  );
}

export default QuestionCard;
