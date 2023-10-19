import "./ReverseAnswerQuiz.css";
import React from "react";
import { Switch, InputNumber } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faStar } from "@fortawesome/free-solid-svg-icons";

const ReverseAnswerQuiz = ({ value, onChange }) => {
  return (
    <div className="custom-Reversequiz-card">
      <div className="custom-Reversequiz-card-header">
        <button className="Reverseicon-button">
          <img src="/imagenes/quiz/addImage.png" alt="icon" />
        </button>
        <div className="answer-input">
          <input
            className="answer-input-format"
            type="text"
            placeholder="Answer"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
      <div className="custom-quiz-card-footer">
        <div className="additional-options">
          <InputNumber
            style={{ width: "65px" }}
            min={0}
            max={20}
            prefix={<FontAwesomeIcon icon={faStar} />}
          />
          <Switch
            checkedChildren={<FontAwesomeIcon icon={faCheck} />}
            unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
          />
        </div>
      </div>
    </div>
  );
};

export default ReverseAnswerQuiz;
