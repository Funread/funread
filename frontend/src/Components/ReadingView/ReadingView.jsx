import React from "react";
import "./ReadingView.sass";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ErrorPage from "../ErrorHandler/ErrorPage";
import PageSelector from "./PageSelector";
import PopUpAchieve from "../Badges/PopUpAchieve";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useReadingBook } from "./Hooks/useReadingBook";


function ReadingView() {
  const navigate = useNavigate();
  const handle = useFullScreenHandle();
  const user = useSelector((state) => state.user);
  const bookid = useParams().id;

  // Custom hook para toda la lógica de lectura
  const {
    pagesCount,
    gridDirection,
    gridNumRows,
    pageNumer,
    setPageNumer,
    widgets,
    pageData,
    quizTotalPoints,
    quizResponses,
    handleQuizResponse,
    error,
    handlePreviousPage,
    handleNextPage,
    ExitReading,
    ForceExitReading,
    currentBadge,
    contentBook
  } = useReadingBook(bookid, user);

  return (
    <FullScreen handle={handle}>
      <div className="presentation-container">
        <Button className="close-button" onClick={ForceExitReading}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>

        {quizTotalPoints > 0 && (
          <div className="quiz-points-display">Points: {quizTotalPoints}</div>
        )}

        {error ? (
          <div>
            <ErrorPage />
          </div>
        ) : (
          <div className={`reading-view-layout`}>
            <div className="content-wrapper">
              <div className="page-content">
                <PageSelector
                  pageType={contentBook?.[pageNumer]?.page?.type || 1}
                  widgetId={contentBook?.[pageNumer]?.widgetitems?.[0]?.widgetid}
                  gridDirection={gridDirection}
                  gridNumRows={gridNumRows}
                  pageNumer={pageNumer}
                  widgets={widgets}
                  pageData={pageData}
                  onQuizResponse={handleQuizResponse}
                  savedResponses={quizResponses}
                />
              </div>
            </div>
            <div className="navigation-footer">
              <button
                onClick={handlePreviousPage}
                disabled={pageNumer === 0}
                className="nav-button"
              >
                ←
              </button>
              <span className="page-number">
                Page {pageNumer + 1} of {pagesCount}
              </span>
              <button
                onClick={handleNextPage}
                disabled={pageNumer === pagesCount - 1}
                className="nav-button"
              >
                →
              </button>{" "}
              {pageNumer === pagesCount - 1 && (
                <button onClick={ExitReading} className="exit-button">
                  Save & Finish
                </button>
              )}
              {currentBadge && <PopUpAchieve Badge={currentBadge} />}
            </div>
          </div>
        )}
      </div>
    </FullScreen>
  );
}

export default ReadingView;
