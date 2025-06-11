import React from 'react';

const QuizAnswers = ({ answers, selectedAnswer, setSelectedAnswer, isSubmitted }) => {
  console.log('QuizAnswers - received answers:', answers);

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    console.log('QuizAnswers: No valid answers');
    return <div>No answers available</div>;
  }

  return (
    <div className="quiz-answers-container">
      {answers.map((answer) => {
        console.log('Rendering answer:', answer);
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
                {answer.isCorrect && <span className="points">+{answer.points} points</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuizAnswers; 