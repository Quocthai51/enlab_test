// import { useState } from "react";
// import { useEffect } from "react";
import "./App.css";
// import qData from "./data.json";
import QuestionPage from "./pages/QuestionPage";

import top from "./assets/top.png";
import bot from "./assets/bot.png";
import topSm from "./assets/top-sm.png";
import botSm from "./assets/bot-sm.png";
import useGameStore from "./store/useGameStore";

function App() {
  const {gameStarted, setGameStarted} = useGameStore()
 

  return (
    <div className="App">
      <header className="App__header">
        {gameStarted ? (
          <div>
            <img className="art--rightTop" src={topSm} alt="top-sm" />
            <img className="art--leftBottom" src={botSm} alt="bot-sm" />

            <QuestionPage />
          </div>
        ) : (
          <div>
            <img className="art--rightTop" src={top} alt="top" />
            <img className="art--leftBottom" src={bot} alt="bot" />
            <div className="App__description">
              <h1 style={{ marginBlockEnd: 10 }}> Quiz App</h1>
              <p style={{ marginBlockEnd: 10 }}>
                App for testing your knowledge
              </p>
              <button
                className="App__startBtn"
                style={{ marginBlockStart: 25 }}
                onClick={() => setGameStarted(true)}
              >
                Start quiz
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
