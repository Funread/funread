import React, { useState, useEffect } from 'react';
import './QuizComplete.css';
import QuizMedia from '../QuizMultiple/QuizMedia';

const QuizComplete = ({ quizData, onAnswerSelected, initialAnswer = null, isSubmitted = false }) => {
  const [userAnswer, setUserAnswer] = useState(initialAnswer || '');
  const [localIsSubmitted, setLocalIsSubmitted] = useState(isSubmitted);

  useEffect(() => {
    setUserAnswer(initialAnswer || '');
    setLocalIsSubmitted(isSubmitted);
  }, [initialAnswer, isSubmitted]);

  if (!quizData) {

    return null;
  }
  


  const handleSubmit = () => {
    if (userAnswer.trim() !== '' && !localIsSubmitted) {
      setLocalIsSubmitted(true);
      
      // Compare user's answer with the correct answer
      const isCorrect = userAnswer.trim().toLowerCase() === quizData.correctAnswer.toLowerCase();
      
      // Notify parent component with the answer
      if (onAnswerSelected) {
        onAnswerSelected(
          userAnswer,
          isCorrect,
          isCorrect ? quizData.points : 0
        );
      }
    }
  };

  // Create text with blank space to fill
  const questionParts = quizData.question.split(/_+/);

  return (
    <div className="quiz-complete-container">
      {quizData.title && (
        <h2 className="quiz-title">{quizData.title}</h2>
      )}

      {quizData.media && quizData.media.url && (
        <div className="quiz-media-container">
          <QuizMedia media={quizData.media} />
        </div>
      )}

        <div className="fill-in-blank">
          {questionParts[0]}
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => !localIsSubmitted && setUserAnswer(e.target.value)}
            disabled={localIsSubmitted}
            placeholder="Type your answer here"
            className={`answer-input ${
              localIsSubmitted
                ? userAnswer.trim().toLowerCase() === quizData.correctAnswer.toLowerCase()
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
          />
          {questionParts[1]}
        </div>

      {localIsSubmitted && (
        <div className="answer-feedback">
          {userAnswer.trim().toLowerCase() === quizData.correctAnswer.toLowerCase() ? (
            <div className="correct-feedback">
              Correct! +{quizData.points} points
            </div>
          ) : (
            <div className="incorrect-feedback">
              Incorrect. The correct answer was: {quizData.correctAnswer}
            </div>
          )}
        </div>
      )}

      {!isSubmitted && (
        <button 
          className={`quiz-submit-button ${userAnswer.trim() !== '' ? 'active' : ''}`}
          onClick={handleSubmit}
          disabled={userAnswer.trim() === '' || localIsSubmitted}
        >
          {localIsSubmitted ? 'Submitted' : 'Submit Answer'}
        </button>
      )}
    </div>
  );
};

export default QuizComplete; 