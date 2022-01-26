
const guessAppReducer = (state, action) => {
  if (action.type === "GUESS_CHANGED") {
    return { ...state, guess: action.payload };
  }

  if (action.type === "CHECK_GUESS" && state.score >= 1) {
    const { guess, secretNumber, score } = state;

    let natureOfGuess;

    const uGuess = parseInt(guess);

    //Check if user's guess is valid
    const isValidGuess = uGuess && uGuess > 0 && uGuess < state.maxGuess + 1;

    // Urge user to type in a valid input
    if (!isValidGuess) {
      natureOfGuess = "⛔️ Please pick a valid number!";
      return {
        ...state,
        guessInfo: natureOfGuess,
      };
    }

    // Check if user's guess is correct
    const isCorrect = uGuess === secretNumber;

    //Add winner "style" if user's guess is correct

    if (isCorrect) document.body.style.backgroundColor = " #60b347";


    //Determine text to display for a VALID user guess
    natureOfGuess =
      !isCorrect && score - 1 === 0
        ? "💥 You lost the game!"
        : isCorrect
        ? "🎉 Correct Number!"
        : uGuess > secretNumber
        ? "📈 Too high!"
        : "📉 Too low!";

    return {
      ...state,
      score: !isCorrect ? score - 1 : score,
      guessInfo: natureOfGuess,
      isCorrect: isCorrect,
      guess: isCorrect ? uGuess : "",
    };
  }

  if (action.type === "RESET_GAME") {
    document.body.style.backgroundColor = "#222";


    return {
      ...state,
      secretNumber: Math.trunc(Math.random() * 20) + 1,
      guess: "",
      score: 20,
      highScore: state.score > state.highScore ? state.score: state.highScore,
      guessInfo: "Start guessing...",
      isCorrect: false,
    };
  }
};

export default guessAppReducer;
