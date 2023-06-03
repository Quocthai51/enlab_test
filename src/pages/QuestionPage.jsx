import useGameStore from "../store/useGameStore";
import { AiFillCloseCircle } from "react-icons/ai";
import "./QuestionPage.css";
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";
// import axios from 'axios';
import { nanoid } from "nanoid";
//
import Question from "../components/Question";
import Timer from "../components/Timer";
import Notification from "../components/Notification";
import Confetti from "react-confetti";
import Loading from "../components/Loading";
import winImg from "../assets/win.png";
import loseImg from "../assets/lose.png";

const QuestionPage = () => {
  const {
    setGameStarted,
    setScore,
    setIsTimerRunning,
    isEndGame,
    setIsEndGame,
    score,
  } = useGameStore();
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const shuffleAnswer = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    setIsEndGame(false);
    setIsLoading(true);
    async function getQuestion() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      let q = [];
      data.results.forEach((question) => {
        q.push({
          id: nanoid(),
          question: question.question,
          answers: shuffleAnswer([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
          correctAns: question.correct_answer,
          checked: false,
          selected: null,
        });
      });
      setAllQuestions(q);
      setIsTimerRunning(true);
      setIsLoading(false);
    }
    getQuestion();
  }, []);

  useEffect(() => {
    let correct = 0;
    allQuestions.forEach((question) => {
      if (question.correctAns === question.selected) {
        correct++;
      }
    });
    setScore(correct);
  }, [allQuestions]);

  console.log(allQuestions)

  function handleClickAnswer(id, answer) {
    setAllQuestions((questions) =>
      questions.map((question) => {
        return question.id === id
          ? { ...question, selected: answer, checked: true }
          : question;
      })
    );
  }

  function handleFinish() {
    setIsTimerRunning(false);
    setIsEndGame(true);
  }

  return (
    <div className="QuestionPage">
      <IconContext.Provider value={{ size: 30 }}>
        <div className="QuestionPage__CloseBtn">
          <AiFillCloseCircle onClick={() => setGameStarted(false)} />
        </div>
      </IconContext.Provider>
      <div className="QuestionPage__Timer">
        <Timer />
      </div>
      {isEndGame && (
        <>
          <div className="QuestionPage__Notification">
            {score > allQuestions?.length / 2 ? (
              <Notification
                title={"Congratulations!!"}
                desc={"You are amazing!!"}
                image={winImg}
                numberOfQuestions={allQuestions?.length}
              />
            ) : (
              <Notification
                title={"Completed!!"}
                desc={"Better luck next time!!"}
                image={loseImg}
                numberOfQuestions={allQuestions?.length}
              />
            )}
          </div>
          <Confetti />
        </>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="QuestionPage__Question">
          <h2>
            Question {currentQuestion + 1}/{allQuestions?.length}
          </h2>
          {allQuestions && (
            <>
              <Question
                key={allQuestions[currentQuestion]?.id}
                checked={allQuestions[currentQuestion]?.checked}
                question={allQuestions[currentQuestion]?.question}
                answers={allQuestions[currentQuestion]?.answers}
                selected={allQuestions[currentQuestion]?.selected}
                correctAns={allQuestions[currentQuestion]?.correctAns}
                id={allQuestions[currentQuestion]?.id}
                handleClickAnswer={handleClickAnswer}
              />
            </>
          )}
          <div className="QuestionPage__GroupBtn">
            {currentQuestion > 0 && (
              <button
                className="QuestionPage__Btn"
                disabled={!allQuestions[currentQuestion]?.selected}
                onClick={() =>
                   setCurrentQuestion(currentQuestion - 1)
                   
                }
              >
                Previous
              </button>
            )}

            <button
              className="QuestionPage__Btn"
              disabled={!allQuestions[currentQuestion]?.selected}
              onClick={() =>
                currentQuestion < allQuestions?.length - 1
                  ? setCurrentQuestion(currentQuestion + 1)
                  : handleFinish()
              }
            >
              {currentQuestion < allQuestions?.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
