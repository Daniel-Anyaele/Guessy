import React, { useReducer } from "react";
import guessAppReducer from "./reducers";


const GuessApp = () => {

  
  const defaultState = {
    maxGuess: 20,
    secretNumber: Math.trunc(Math.random() * 20) + 1,
    guess: "",
    score: 20,
    highScore: 0,
    guessInfo: "Start guessing...",
    isCorrect: false,
  };


  const [state, dispatch] = useReducer(guessAppReducer, defaultState);

  const handleCheck = () => {
    dispatch({ type: "CHECK_GUESS" });
  };

  const handleGameReset = () => {
    dispatch({ type: "RESET_GAME" });
  };

  return (
    <>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and 20)</p>
        <button className="btn again" onClick={handleGameReset}>
          Play Again!
        </button>
        <div className="number" style={{ width: state.isCorrect && "30rem" }}>
          {state.isCorrect ? state.secretNumber : "?"}
        </div>
      </header>
      <main>
        <section className="left">
          <input
            type="number"
            className="guess"
            value={state.guess}
            onChange={(e) =>
              dispatch({ type: "GUESS_CHANGED", payload: e.target.value })
            }
          />
          <button
            disabled={state.score === 0 && true}
            className={`btn check ${state.score === 0 && "disabled"}`}
            onClick={handleCheck}
          >
            Check!
          </button>
        </section>
        <section className="right">
          <p className="message">{state.guessInfo}</p>
          <p className="label-score">
            💯 Score: <span className="score">{state.score}</span>
          </p>
          <p className="label-highscore">
            🥇 Highscore: <span className="highscore">{state.highScore}</span>
          </p>
        </section>
      </main>
    </>
  );
};

export default GuessApp;
