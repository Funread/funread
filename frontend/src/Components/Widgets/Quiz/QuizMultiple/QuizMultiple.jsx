import React, { useState, useEffect } from 'react';
import './QuizMultiple.css';
import QuizMedia from './QuizMedia';
import QuizAnswers from './QuizAnswers';

const QuizMultiple = ({ quizData, onAnswerSelected, initialAnswer = null, isSubmitted = false }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(initialAnswer);
  const [localIsSubmitted, setLocalIsSubmitted] = useState(isSubmitted);

  // Efecto para actualizar el estado cuando cambian las props
  useEffect(() => {
    setSelectedAnswer(initialAnswer);
    setLocalIsSubmitted(isSubmitted);
  }, [initialAnswer, isSubmitted]);

  // Validación mejorada
  if (!quizData) {
    console.log('QuizMultiple: No quiz data');
    return null;
  }

  console.log('QuizMultiple - received quizData:', quizData);
  console.log('QuizMultiple - answers:', quizData.answers);
  console.log('QuizMultiple - initialAnswer:', initialAnswer, 'isSubmitted:', isSubmitted);

  // Validar específicamente las respuestas
  if (!quizData.answers || !Array.isArray(quizData.answers) || quizData.answers.length === 0) {
    console.log('QuizMultiple: No valid answers');
    return <div>No answers available</div>;
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null && !localIsSubmitted) {
      setLocalIsSubmitted(true);
      
      // Obtener la respuesta seleccionada
      const selectedAnswerData = quizData.answers.find(answer => answer.id === selectedAnswer);
      
      // Notificar al componente padre con la selección
      if (selectedAnswerData && onAnswerSelected) {
        onAnswerSelected(
          selectedAnswer,
          selectedAnswerData.isCorrect,
          selectedAnswerData.points
        );
      }
    }
  };

  // Si ya está respondido y tenemos una respuesta inicial, no mostramos el botón de enviar
  const showSubmitButton = !isSubmitted || !initialAnswer;

  return (
    <div className="quiz-multiple-container">
      {/* Título con validación */}
      {quizData.title && (
        <h2 className="quiz-title">{quizData.title}</h2>
      )}

      {/* Media con validación */}
      {quizData.media && quizData.media.url && (
        <div className="quiz-media-container">
          <QuizMedia media={quizData.media} />
        </div>
      )}

      {/* Pregunta con validación */}
      {quizData.question && (
        <div className="quiz-question">
          <h3>{quizData.question}</h3>
        </div>
      )}

      {/* Respuestas con validación */}
      {quizData.answers && quizData.answers.length > 0 && (
        <QuizAnswers
          answers={quizData.answers}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          isSubmitted={localIsSubmitted}
        />
      )}

      {/* Botón de enviar - solo si no está ya respondido desde localStorage */}
      {showSubmitButton && (
        <button 
          className={`quiz-submit-button ${selectedAnswer !== null ? 'active' : ''}`}
          onClick={handleSubmit}
          disabled={selectedAnswer === null || localIsSubmitted}
        >
          {localIsSubmitted ? 'Submitted' : 'Submit Answer'}
        </button>
      )}
    </div>
  );
};

export default QuizMultiple; 