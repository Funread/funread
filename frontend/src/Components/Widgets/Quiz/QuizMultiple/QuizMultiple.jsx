import React, { useState } from 'react';
import './QuizMultiple.css';
import QuizMedia from './QuizMedia';
import QuizAnswers from './QuizAnswers';

const QuizMultiple = ({ quizData }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Agregamos validación de props
  if (!quizData) {
    console.log('QuizMultiple: No hay datos de quiz');
    return null;
  }

  console.log('QuizData recibido:', quizData); // Debug

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setIsSubmitted(true);
    }
  };

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
          isSubmitted={isSubmitted}
        />
      )}

      {/* Botón de enviar */}
      <button 
        className={`quiz-submit-button ${selectedAnswer !== null ? 'active' : ''}`}
        onClick={handleSubmit}
        disabled={selectedAnswer === null || isSubmitted}
      >
        {isSubmitted ? 'Enviado' : 'Enviar Respuesta'}
      </button>
    </div>
  );
};

export default QuizMultiple; 