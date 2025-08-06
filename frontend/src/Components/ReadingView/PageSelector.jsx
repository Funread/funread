import React from 'react'
import GridPage from './Components/Pages/GridPage';
import KonvaPage from './Components/Pages/KonvaPage';
import QuizPage from './Components/Pages/QuizPage';
import WordSearchPage from './Components/Pages/WordSearchPage';

const PageSelector = ({ pageType, onQuizResponse, savedResponses, ...props }) => {
  switch (pageType) {
    case 1:
      return <GridPage {...props} />
    case 2:
      return <KonvaPage {...props} />
    case 4:
      console.log("caso 4")
      return (
        <div className="quiz-page-wrapper">
          <QuizPage 
            widgets={props.widgets} 
            pageData={props.pageData} 
            onQuizResponse={onQuizResponse}
            savedResponses={savedResponses}
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