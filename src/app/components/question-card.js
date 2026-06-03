


function QuestionCard({ card, flag, ...options }) {
  return (
    <div className={card}>
      <h2>what is the name of this country?</h2>
      <img src={flag} alt="country flag" />
      
      <button>{options[0]}</button>
      <button>{options[1]}</button>
      <button>{options[2]}</button>
      <button>{options[3]}</button>
    </div>
  );
}

export default QuestionCard;
