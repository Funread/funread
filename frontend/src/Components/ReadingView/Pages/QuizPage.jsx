import React, { useState, useEffect } from "react";
import QuizMultiple from "../../Widgets/Quiz/QuizMultiple/QuizMultiple";
import QuizComplete from "../../Widgets/Quiz/QuizComplete/QuizComplete";
import "./QuizPage.css";
import { list_options_by_idwidgetitem } from "../../../api/options";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import { Sparkles, Trophy, Star, Zap } from "lucide-react";
// Importamos animaciones divertidas para niños
import happyAnimalAnimation from "../../../assets/animations/happy-animal.json";
import pencilDancingAnimation from "../../../assets/animations/pencil-dancing.json";
import colorfulBalloonAnimation from "../../../assets/animations/colorful-balloon.json";
import thumbsUpAnimation from "../../../assets/animations/thumbs-up-kid.json";

const QuizPage = ({ widgets, pageData, onQuizResponse, savedResponses }) => {
  const [quizData, setQuizData] = useState(null);
  const [quizOptions, setQuizOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // Estado para indicar si el quiz ha sido enviado a la API
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  // Estado para controlar las animaciones
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState("animal"); // 'animal', 'pencil', 'balloon', 'thumbsUp'
  // Obtenemos el ID del libro de los parámetros de la URL
  const { id: bookId } = useParams();
  // Obtenemos el usuario actual desde Redux
  const user = useSelector((state) => state.user);

  // Conjunto de animaciones divertidas para niños
  const animations = {
    animal: happyAnimalAnimation,
    pencil: pencilDancingAnimation,
    balloon: colorfulBalloonAnimation,
    thumbsUp: thumbsUpAnimation,
  };

  // Conjunto de mensajes divertidos
  const celebrationMessages = [
    "Super! You're amazing! 🌟",
    "Great! Keep it up! 🚀",
    "Wow! You're so smart! 🧠",
    "Fantastic work! 🎈",
    "You're a champion! 🏆",
  ];

  // Estado para el mensaje de celebración
  const [celebrationMessage, setCelebrationMessage] = useState(
    celebrationMessages[0]
  );

  // Configuración para las animaciones de Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animations[animationType],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Agregamos log para ver si el componente se monta y qué props recibe
  console.log("QuizPage mounted - props received:", {
    widgets,
    pageData,
    savedResponses,
  });

  useEffect(() => {
    setIsLoading(true);
    if (!widgets || !Array.isArray(widgets) || widgets.length === 0) {
      setQuizData([]);
      setIsLoading(false);
      return;
    }

    // Los widgets son los widgetitems de la página, no necesitamos filtrar
    // Solo procesamos si el tipo de página es 4 (quiz)
    const parsedQuizData = widgets.map((widget) => {
      let valueData = widget.value;
      if (typeof valueData === 'string') {
        try {
          valueData = JSON.parse(valueData);
        } catch (e) {
          console.error('Error parsing widget.value:', e);
          return null;
        }
      }
      
      console.log('Quiz widget valueData:', valueData);
      
      // Estructura esperada del BookCreator
      if (!valueData || !valueData.type) {
        console.log('❌ Quiz widget sin tipo válido:', valueData);
        return null;
      }
      
      // Normalizar el tipo a minúsculas para comparación
      const quizType = valueData.type.toLowerCase();
      console.log('📝 Quiz type detected:', quizType);
      
      if (quizType === 'singlechoice') {
        // Estructura del QuizEditor: { type, content: {title, question}, options: [{answer, isCorrect, points}] }
        console.log('✅ Parsing singleChoice quiz');
        return {
          type: 'singleChoice',
          content: valueData.content,
          answers: valueData.options?.map((opt, i) => ({
            id: i,
            text: opt.answer,
            isCorrect: opt.isCorrect,
            points: opt.points,
          })) || []
        };
      } else if (quizType === 'complete') {
        // Estructura del QuizCompleteEditor: { type: "complete", content: {title, question, correctAnswer, points} }
        console.log('✅ Parsing complete quiz, content:', valueData.content);
        const parsedQuiz = {
          type: 'complete',
          title: valueData.content?.title,
          question: valueData.content?.question,
          correctAnswer: valueData.content?.correctAnswer,
          points: valueData.content?.points || 10,
          media: valueData.media
        };
        console.log('📦 Parsed quiz complete:', parsedQuiz);
        return parsedQuiz;
      }
      
      console.log('❌ Quiz type not supported:', quizType);
      return null;
    }).filter(Boolean);

    setQuizData(parsedQuizData);
    // Verifica si ya se contestó alguno
    const hasAnswered = parsedQuizData.some((w, idx) => savedResponses?.[widgets[idx]?.widgetitemid]);
    if (hasAnswered) setQuizSubmitted(true);
    setIsLoading(false);
  }, [widgets, savedResponses]);

  // Efecto para ocultar la animación después de 5 segundos
  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  // Función para manejar los cambios en las respuestas del quiz
  const handleQuizChange = (widgetId, selectedAnswer, isCorrect, points) => {
    console.log("Quiz updated:", widgetId, selectedAnswer, isCorrect, points);

    // Asegurarse de que los puntos sean un número
    const pointsNumber = Number(points) || 0;
    console.log("Points converted to number:", pointsNumber);

    // Comunicar la respuesta al componente padre (ReadingView)
    if (onQuizResponse) {
      // Llamar directamente con los parámetros individuales en lugar de un objeto anidado
      onQuizResponse(widgetId, selectedAnswer, isCorrect, pointsNumber);
    }

    // Marcar este quiz como respondido
    setQuizSubmitted(true);

    // Mostrar animación si la respuesta es correcta
    if (isCorrect) {
      // Elegir aleatoriamente una animación
      const animationTypes = Object.keys(animations);
      const randomAnimationType =
        animationTypes[Math.floor(Math.random() * animationTypes.length)];
      setAnimationType(randomAnimationType);

      // Elegir aleatoriamente un mensaje de celebración
      const randomMessage =
        celebrationMessages[
          Math.floor(Math.random() * celebrationMessages.length)
        ];
      setCelebrationMessage(randomMessage);

      setShowAnimation(true);
    }
  };

  if (isLoading) {
    return (
      <div className="quiz-page-loading">
        <div className="loading-spinner">
          <Sparkles className="spinner-icon" size={48} />
        </div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  // Debug de datos antes del render
  console.log("QuizData before render:", quizData);

  return (
    <div className="quiz-page-wrapper">
      <div className="quiz-page-container">
        {/* Header decorativo */}
        <div className="quiz-page-header">
        <div className="header-decoration">
          <Star className="header-icon" size={24} />
          <h1 className="quiz-page-title">Quiz Time!</h1>
          <Star className="header-icon" size={24} />
        </div>
        <p className="quiz-page-subtitle">Test your knowledge and earn points</p>
      </div>

      {/* Animación que se muestra cuando una respuesta es correcta */}
      {showAnimation && (
        <div className="celebration-animation">
          <Lottie options={defaultOptions} height={400} width={400} />
          <div className="celebration-message">{celebrationMessage}</div>
        </div>
      )}

      <div className="quiz-content">
        {quizData?.map((quiz, idx) => {
          // Adaptar para la nueva estructura
          const savedResponse = savedResponses && savedResponses[idx];
          const initialAnswer = savedResponse ? savedResponse.answerId : null;
          const isAnswered = !!savedResponse;

          let QuizComponent;
          let quizProps = {
            onAnswerSelected: (answerId, isCorrect, points) =>
              handleQuizChange(idx, answerId, isCorrect, points),
            initialAnswer: initialAnswer,
            isSubmitted: isAnswered,
          };

          if (quiz.type === 'singleChoice') {
            QuizComponent = QuizMultiple;
            quizProps.quizData = {
              title: quiz.content?.title,
              question: quiz.content?.question,
              answers: quiz.answers,
            };
          } else if (quiz.type === 'complete') {
            QuizComponent = QuizComplete;
            quizProps.quizData = quiz;
          } else {
            console.error("Tipo de quiz no soportado:", quiz.type);
            return null;
          }

          return (
            <div key={idx} className="quiz-widget-container">
              <div className="quiz-widget-header">
                <div className="quiz-number-badge">
                  <Zap size={20} />
                  Question {idx + 1}
                </div>
                <div className={`quiz-type-badge ${quiz.type === 'singleChoice' ? 'single-choice' : 'fill-blank'}`}>
                  {quiz.type === 'singleChoice' ? 'Multiple Choice' : 'Fill in the Blank'}
                </div>
              </div>

              <QuizComponent {...quizProps} />

              {isAnswered && (
                <div className="quiz-feedback-container">
                  {savedResponse &&
                  (savedResponse.isCorrect === true ||
                    savedResponse.isCorrect === 1 ||
                    savedResponse.isCorrect === "true") ? (
                    <div className="feedback-card correct">
                      <Trophy className="feedback-icon" size={20} />
                      <span className="feedback-text">
                        Correct answer! +{savedResponse.pointsAwarded} points
                      </span>
                    </div>
                  ) : (
                    <div className="feedback-card incorrect">
                      <span className="feedback-text">Incorrect answer. Try again next time!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default QuizPage;
