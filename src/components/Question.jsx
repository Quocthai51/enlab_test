// import React from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import "./Question.css";


const Question = (props) => {
  const {
    question,
    checked,
    answers,
    correctAns,
    selected,
    id,
    handleClickAnswer,
  } = props;

  const answerElement = answers?.map((answer) => {
    let isCorrectId = "";
    if (checked) {
      if (correctAns === answer) {
        isCorrectId = "correct";
      } else if (selected === answer) {
        isCorrectId = "incorrect";
      } else {
        isCorrectId = "";
      }
    }

    return (
      <button
        key={nanoid()}
        id={isCorrectId}
        className='answer'
        onClick={() => handleClickAnswer(id, answer)}
        disabled={checked}
      >
        {decode(answer)}
      </button>
    );
  });

  return (
    <div className="Question">
      <h4 className="Question__Title"> {decode(question)}</h4>
      <div className="Question__Answers">{answerElement}</div>
    </div>
  );
};


export default Question;
