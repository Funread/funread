import "./ReverseUniqueSelection.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import ReverseAnswerQuiz from "./ReverseAnswerQuiz";
import { useDrag } from "react-dnd";

const MIN_RESPONSES = 2;
const MAX_RESPONSES = 4;

const widgetType = "widgetType";

const initialReverseQuiz = {
  answer: "",
  points: 0,
  correct: false,
  image: "/imagenes/quiz/addImage.png",
};

const ReverseUniqueSelection = ({ onWidgetChange }) => {
  const [responses, setResponses] = useState(
    Array(MIN_RESPONSES).fill({ ...initialReverseQuiz })
  );
  const [isAddingResponses, setIsAddingResponses] = useState(true); // Estado inicial: agregar respuestas

  const [{ isDragging }, drag] = useDrag(() => ({
    type: widgetType,
    item: { type: "ReverseUniqueSelection" },
    //La funcion collect es opcional
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const addResponses = () => {
    if (responses.length < MAX_RESPONSES) {
      setResponses([...responses, initialReverseQuiz, initialReverseQuiz]);
    }
  };

  const removeResponses = () => {
    if (responses.length > MIN_RESPONSES) {
      const newResponses = responses.slice(0, -2);
      setResponses(newResponses);
    }
  };

  const toggleAddingResponses = () => {
    if (isAddingResponses) {
      addResponses();
    } else {
      removeResponses();
    }
  };

  const handleResponseChange = (
    index,
    newAnswer,
    newPoints,
    newCorrect,
    newImage
  ) => {
    setResponses((prevResponses) => {
      if (index < 0 || index >= prevResponses.length) {
        console.error("Índice no válido");
        return prevResponses;
      }
      const newResponses = [...prevResponses];
      newResponses[index] = {
        ...newResponses[index],
        answer: newAnswer,
        points: newPoints,
        correct: newCorrect,
        image: newImage,
      };
      return newResponses;
    });
  };

  useEffect(() => {
    onWidgetChange({
      type: "ReverseUniqueSelection",
      data: { data: responses },
    });
    if (responses.length === MIN_RESPONSES) {
      setIsAddingResponses(true);
    } else if (responses.length === MAX_RESPONSES) {
      setIsAddingResponses(false);
    }
  }, [responses]);

  return (
    <div
      ref={drag}
      className="custom-unique-selection-background"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    >
      <div className="custom-quiz-background">
        <div className="container custom-quiz-container text-center">
          <div className="row">
            <div className="col">
              {/* <div id='cardQuestions'>
              <div className='row'>
                <input
                  type='text'
                  className='custom-input'
                  placeholder='Start typing your question'
                />

              </div>
            </div> */}

              <div className="responses-grid mx-auto mt-5">
                {responses.map((response, index) => (
                  <ReverseAnswerQuiz
                    key={index}
                    value={response}
                    onChange={(answer, points, correct, image) =>
                      handleResponseChange(
                        index,
                        answer,
                        points,
                        correct,
                        image
                      )
                    }
                  />
                ))}
              </div>
              <button
                className={`custom-button ${
                  isAddingResponses ? "adding" : "removing"
                }`}
                onClick={toggleAddingResponses}
              >
                <div className="button-content">
                  <div className="button-icon">
                    {isAddingResponses ? (
                      <FontAwesomeIcon size="lg" icon={faPlus} />
                    ) : (
                      <FontAwesomeIcon size="lg" icon={faMinus} />
                    )}
                  </div>
                  <div className="button-text">
                    {isAddingResponses
                      ? "Add more answers"
                      : "Remove additional answers"}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReverseUniqueSelection;
