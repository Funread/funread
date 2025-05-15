import React, { useState, useEffect } from "react";
import QuizMultiple from "../../Widgets/Quiz/QuizMultiple/QuizMultiple";
import "./QuizPage.css";
import { list_options_by_idwidgetitem } from "../../../api/options";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
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
    console.log("useEffect running - widgets:", widgets);

    if (!widgets) {
      console.log("No widgets available");
      return;
    }

    const loadQuizData = async () => {
      try {
        setIsLoading(true);
        console.log("Starting loadQuizData");

        // Verificar que widgets existe y es un array
        if (!Array.isArray(widgets)) {
          console.error("Widgets is not an array:", typeof widgets);
          return;
        }

        const quizWidgets = widgets.filter((widget) => {
          console.log("Evaluating widget:", widget);
          return widget.type === 4;
        });

        console.log("Quiz widgets found:", quizWidgets);

        // Cargar las opciones para cada widget de quiz
        const optionsPromises = quizWidgets.map(async (widget) => {
          console.log("Loading options for widget:", widget.widgetitemid);
          const options = await list_options_by_idwidgetitem(
            widget.widgetitemid
          );
          return { widgetId: widget.widgetitemid, options };
        });

        const allOptions = await Promise.all(optionsPromises);
        const optionsMap = {};
        allOptions.forEach(({ widgetId, options }) => {
          optionsMap[widgetId] = options;
        });

        setQuizOptions(optionsMap);
        setQuizData(quizWidgets);

        // Verificar si hay respuestas guardadas para marcar el quiz como respondido
        if (savedResponses) {
          const hasAnsweredCurrentQuizzes = quizWidgets.some(
            (widget) => savedResponses[widget.widgetitemid]
          );

          if (hasAnsweredCurrentQuizzes) {
            setQuizSubmitted(true);
          }
        }
      } catch (error) {
        console.error("Error in loadQuizData:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizData();
  }, [widgets, savedResponses]); // Añadimos savedResponses a las dependencias

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
    return <div className="quiz-page-loading">Loading quiz...</div>;
  }

  // Debug de datos antes del render
  console.log("QuizData before render:", quizData);

  return (
    <div className="quiz-page-container">
      {/* Animación que se muestra cuando una respuesta es correcta */}
      {showAnimation && (
        <div className="celebration-animation">
          <Lottie options={defaultOptions} height={400} width={400} />
          <div className="celebration-message">{celebrationMessage}</div>
        </div>
      )}

      <div className="quiz-content">
        {quizData?.map((widget) => {
          console.log("Processing widget in map:", widget);

          if (!widget.value) {
            console.log("Widget without value:", widget);
            return null;
          }

          let valueData = widget.value;
          if (typeof widget.value === "string") {
            try {
              valueData = JSON.parse(widget.value);
              console.log("Value parsed correctly:", valueData);
            } catch (e) {
              console.error("Error parsing value:", e);
              return null;
            }
          }

          console.log("Final valueData:", valueData);

          // Solo verificamos title y question, ya no answers
          if (!valueData.title || !valueData.question) {
            console.error(
              "ValueData does not have correct structure:",
              valueData
            );
            return null;
          }

          // Convertimos las opciones de la API al formato que espera QuizMultiple
          const quizAnswers =
            quizOptions[widget.widgetitemid]?.map((option) => ({
              id: option.idoption,
              text: option.answer,
              points: option.points,
              isCorrect: option.iscorrect === 1,
            })) || [];

          // Debug para ver las respuestas
          console.log("quizAnswers generated:", quizAnswers);
          console.log(
            "quizOptions available:",
            quizOptions[widget.widgetitemid]
          );

          // Combinamos valueData con las respuestas de la API
          const completeQuizData = {
            ...valueData,
            answers: quizAnswers,
          };

          // Debug del objeto completo
          console.log("completeQuizData:", completeQuizData);

          // Verificar si hay una respuesta guardada para este widget
          const savedResponse =
            savedResponses && savedResponses[widget.widgetitemid];
          const initialAnswer = savedResponse ? savedResponse.answerId : null;
          const isAnswered = !!savedResponse;

          console.log("savedResponse:", savedResponse);

          return (
            <div key={widget.widgetitemid} className="quiz-widget-container">
              <QuizMultiple
                quizData={completeQuizData}
                onAnswerSelected={(answerId, isCorrect, points) =>
                  handleQuizChange(
                    widget.widgetitemid,
                    answerId,
                    isCorrect,
                    points
                  )
                }
                initialAnswer={initialAnswer}
                isSubmitted={isAnswered}
              />

              {isAnswered && (
                <div className="quiz-already-answered">
                  {console.log(
                    "Debug savedResponse:",
                    savedResponse,
                    "isCorrect:",
                    savedResponse.isCorrect,
                    "pointsAwarded:",
                    savedResponse.pointsAwarded
                  )}
                  {savedResponse &&
                  (savedResponse.isCorrect === true ||
                    savedResponse.isCorrect === 1 ||
                    savedResponse.isCorrect === "true") ? (
                    <div className="correct-answer">
                      Correct answer: +{savedResponse.pointsAwarded} points
                    </div>
                  ) : (
                    <div className="incorrect-answer">Incorrect answer</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizPage;
