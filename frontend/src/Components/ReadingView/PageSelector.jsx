import React from 'react'
import GridPage from './Pages/GridPage'  // Antiguo componente Page renombrado
import KonvaPage from './Pages/KonvaPage'  // Nuevo componente para type 2
import QuizMultiple from '../Widgets/Quiz/QuizMultiple/QuizMultiple'

const PageSelector = ({ pageType, ...props }) => {
  switch (pageType) {
    case 1:
      return <GridPage {...props} />
    case 2:
      return <KonvaPage {...props} />
    case 4:
      console.log("caso 4")
      return (
        <div className="quiz-page-wrapper">
          <QuizMultiple quizData={props.widgets?.[0]?.value} />
        </div>
      )
    default:
      return <GridPage {...props} />  // Fallback al tipo 1
  }
}

export default PageSelector 