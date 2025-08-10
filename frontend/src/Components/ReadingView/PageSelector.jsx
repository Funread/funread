import React from 'react'
import GridPage from './Pages/GridPage'  // Antiguo componente Page renombrado
import KonvaPage from './Pages/KonvaPage'  // Nuevo componente para type 2
import QuizPage from './Pages/QuizPage'  // Importar QuizPage en lugar de QuizMultiple
import WordSearchPage from './Pages/WordSearchPage'  // Nuevo componente para sopa de letras

const PageSelector = ({ pageType, onQuizResponse, savedResponses, ...props }) => {
  switch (pageType) {
    case 1:
      return <GridPage {...props} />
    case 2:
      return <KonvaPage {...props} />
    case 4:
      // Forzar remount del quiz al cambiar de página usando key
      return (
        <div className="quiz-page-wrapper" key={`quiz-${props.pageNumer}`}> 
          <QuizPage 
            widgets={props.widgets} 
            pageData={props.pageData} 
            onQuizResponse={onQuizResponse}
            savedResponses={props.savedResponsesForPage} // solo respuestas de la página actual
            pageIndex={props.pageNumer} // opcional, para IDs únicos
          />
        </div>
      )
    case 5:
      return (
        <div className="word-search-page-wrapper">
          <WordSearchPage 
            widgets={props.widgets}
            pageData={props.pageData}
          />
        </div>
      )
    default:
      return <GridPage {...props} />  // Fallback al tipo 1
  }
}

export default PageSelector 