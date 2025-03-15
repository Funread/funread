import React from 'react';

const QuizAnswers = ({ answers, selectedAnswer, setSelectedAnswer, isSubmitted }) => {
  if (!answers || !Array.isArray(answers)) {
    console.log('QuizAnswers: No hay respuestas válidas');
    return null;
  }

  return (
    <div className="quiz-answers-container">
      {answers.map((answer) => {
        const isSelected = selectedAnswer === answer.id;
        const showCorrect = isSubmitted && answer.isCorrect;
        const showIncorrect = isSubmitted && isSelected && !answer.isCorrect;

        return (
          <div
            key={answer.id}
            className={`quiz-answer ${isSelected ? 'selected' : ''} 
                      ${showCorrect ? 'correct' : ''} 
                      ${showIncorrect ? 'incorrect' : ''}`}
            onClick={() => !isSubmitted && setSelectedAnswer(answer.id)}
          >
            <div className="answer-text">{answer.text}</div>
            {isSubmitted && (
              <div className="answer-feedback">
                {answer.isCorrect && <span className="points">+{answer.points} puntos</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuizAnswers; 