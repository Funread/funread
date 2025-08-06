import React from "react";

export default function ReadingViewFooter({
  pageNumer,
  pagesCount,
  handlePreviousPage,
  handleNextPage,
  ExitReading,
  currentBadge
}) {
  return (
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
      </button>
      {pageNumer === pagesCount - 1 && (
        <button onClick={ExitReading} className="exit-button">
          Save & Finish
        </button>
      )}
      {currentBadge && <div>{/* PopUpAchieve aquí */}</div>}
    </div>
  );
}
