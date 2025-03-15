import React, { useState, useEffect } from 'react';
import QuizMultiple from '../../Widgets/Quiz/QuizMultiple/QuizMultiple';
import './QuizPage.css';

const QuizPage = ({ widgets, pageData }) => {
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        setIsLoading(true);
        // Debug de widgets recibidos
        console.log('Widgets completos:', widgets);
        
        // Verificar que widgets existe y es un array
        if (!widgets || !Array.isArray(widgets)) {
          console.error('Widgets no es un array válido:', widgets);
          return;
        }

        const quizWidgets = widgets.filter(widget => {
          console.log('Revisando widget:', widget);
          console.log('Tipo de widget:', widget.type);
          return widget.type === 4;
        });
        
        console.log('Quiz widgets filtrados:', quizWidgets);
        setQuizData(quizWidgets);
      } catch (error) {
        console.error('Error cargando quiz:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizData();
  }, [widgets]);

  const handleQuizChange = (widgetId, newData) => {
    console.log('Quiz actualizado:', widgetId, newData);
  };

  if (isLoading) {
    return <div className="quiz-page-loading">Cargando quiz...</div>;
  }

  // Debug de datos antes del render
  console.log('QuizData antes del render:', quizData);

  return (
    <div className="quiz-page-container">
      <div className="quiz-content">
        {quizData?.map((widget) => {
          console.log('Procesando widget en map:', widget);
          
          if (!widget.value) {
            console.log('Widget sin value:', widget);
            return null;
          }

          let valueData = widget.value;
          if (typeof widget.value === 'string') {
            try {
              valueData = JSON.parse(widget.value);
              console.log('Value parseado correctamente:', valueData);
            } catch (e) {
              console.error('Error parseando value:', e);
              return null;
            }
          }

          console.log('ValueData final:', valueData);
          
          // Verificar que valueData tiene la estructura correcta
          if (!valueData.title || !valueData.question || !valueData.answers) {
            console.error('ValueData no tiene la estructura correcta:', valueData);
            return null;
          }

          return (
            <div key={widget.widgetitemid} className="quiz-widget-container">
              <QuizMultiple quizData={valueData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizPage; 