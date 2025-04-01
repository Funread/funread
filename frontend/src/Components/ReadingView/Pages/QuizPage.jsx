import React, { useState, useEffect } from 'react';
import QuizMultiple from '../../Widgets/Quiz/QuizMultiple/QuizMultiple';
import './QuizPage.css';
import { list_options_by_idwidgetitem } from '../../../api/options';

const QuizPage = ({ widgets, pageData }) => {
  const [quizData, setQuizData] = useState(null);
  const [quizOptions, setQuizOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Agregamos log para ver si el componente se monta y qué props recibe
  console.log('QuizPage montado - props recibidas:', { widgets, pageData });

  useEffect(() => {
    console.log('useEffect ejecutándose - widgets:', widgets);

    if (!widgets) {
      console.log('No hay widgets disponibles');
      return;
    }

    const loadQuizData = async () => {
      try {
        setIsLoading(true);
        console.log('Iniciando loadQuizData');
        
        // Verificar que widgets existe y es un array
        if (!Array.isArray(widgets)) {
          console.error('Widgets no es un array:', typeof widgets);
          return;
        }

        const quizWidgets = widgets.filter(widget => {
          console.log('Evaluando widget:', widget);
          return widget.type === 4;
        });
        
        console.log('Quiz widgets encontrados:', quizWidgets);

        // Cargar las opciones para cada widget de quiz
        const optionsPromises = quizWidgets.map(async widget => {
          console.log('Cargando opciones para widget:', widget.widgetitemid);
          const options = await list_options_by_idwidgetitem(widget.widgetitemid);
          return { widgetId: widget.widgetitemid, options };
        });

        const allOptions = await Promise.all(optionsPromises);
        const optionsMap = {};
        allOptions.forEach(({ widgetId, options }) => {
          optionsMap[widgetId] = options;
        });

        setQuizOptions(optionsMap);
        setQuizData(quizWidgets);
      } catch (error) {
        console.error('Error en loadQuizData:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizData();
  }, [widgets]); // Verificamos que la dependencia está correcta

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
          
          // Solo verificamos title y question, ya no answers
          if (!valueData.title || !valueData.question) {
            console.error('ValueData no tiene la estructura correcta:', valueData);
            return null;
          }

          // Convertimos las opciones de la API al formato que espera QuizMultiple
          const quizAnswers = quizOptions[widget.widgetitemid]?.map(option => ({
            id: option.idoption,
            text: option.answer,
            points: option.points,
            isCorrect: option.iscorrect === 1
          })) || [];

          // Debug para ver las respuestas
          console.log('quizAnswers generados:', quizAnswers);
          console.log('quizOptions disponibles:', quizOptions[widget.widgetitemid]);

          // Combinamos valueData con las respuestas de la API
          const completeQuizData = {
            ...valueData,
            answers: quizAnswers
          };

          // Debug del objeto completo
          console.log('completeQuizData:', completeQuizData);

          return (
            <div key={widget.widgetitemid} className="quiz-widget-container">
              <QuizMultiple 
                quizData={completeQuizData}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizPage; 