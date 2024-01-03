import React from "react";
import { ReactComponent as Question } from "../../../assets/icons/question.svg";
import './FirstQuestion.scss'

const FirstQuestion = ({ OnTitleChange, title }) => {
  return (
    <div className="question">
      <h2 className="question--title">Question 1</h2>
      <div className="question--story-title">
        <input
          type="text"
          className=""
          placeholder="Pre filled text here for question #1"
          onChange={(e) => OnTitleChange(e)}
          default={title}
        />
        <Question />
      </div>
    </div>
  );
};

export default FirstQuestion;
