function Header({ header, score}) {
  return (
    <header className={header}>
      <h1>Countries Quiz</h1>

      <div><p className={score}>Score: 0</p></div>
    </header>
  );
}
export default Header;
