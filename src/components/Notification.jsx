// import React from 'react'
import useGameStore from "../store/useGameStore";
import "./Notification.css";

const Notification = ({ title, desc, image, numberOfQuestions }) => {
  const {
    globeTime,
    score,
    setGameStarted,
    setIsTimerRunning,
    setIsEndGame,
    isEndGame,
  } = useGameStore();
  const { minutes, seconds } = globeTime;
  console.log({ title, desc, image, numberOfQuestions });

  const cusMinus = minutes > 1 ? "minutes" : "minute";
  const cusSecond = seconds > 1 ? "seconds" : "second";

  const cusTime = `${minutes} ${cusMinus} ${seconds} ${cusSecond}`

  function handlePlayAgain() {
    setGameStarted(false);
    setIsTimerRunning(false);
    setIsEndGame(true);
  }

  return (
    <>
      {isEndGame && (
        <div className="Notification">
          <img className="Notification__Image" src={image} />
          <h2>{title}</h2>
          <p>{desc}</p>
          <p>
            {score}/{numberOfQuestions} correct answers in {cusTime}
          </p>
          <button
            className="Notification__Btn"
            onClick={() => handlePlayAgain()}
          >
            Play Again
          </button>
        </div>
      )}
    </>
  );
};

export default Notification;
