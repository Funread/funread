import React, { useState } from "react";

const SingleChoiceQuizPage = ({ value, onQuizResponse, savedResponses }) => {
  // value: el objeto JSON del widgetitem para singleChoice
  const { content, options, pageNumber } = value;
  const [selected, setSelected] = useState(savedResponses?.answerId || null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (answer, points, isCorrect) => {
    setSelected(answer);
    setAnswered(true);
    if (onQuizResponse) {
      onQuizResponse(
        pageNumber,
        answer,
        isCorrect,
        points
      );
    }
  };

  return (
    <div className="single-choice-quiz">
      <h2>{content?.title}</h2>
      <p>{content?.question}</p>
      <ul>
        {options?.map((opt, idx) => (
          <li key={idx}>
            <button
              disabled={answered}
              className={selected === opt.answer ? "selected" : ""}
              onClick={() => handleSelect(opt.answer, opt.points, opt.isCorrect)}
            >
              {opt.answer}
            </button>
          </li>
        ))}
      </ul>
      {answered && (
        <div>
          {options.find(o => o.answer === selected)?.isCorrect
            ? "¡Correcto!"
            : "Incorrecto"}
        </div>
      )}
    </div>
  );
};

export default SingleChoiceQuizPage;
