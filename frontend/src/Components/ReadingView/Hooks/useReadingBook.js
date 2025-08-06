import { useState, useEffect } from "react";
import { fullBook } from "../../../api/books";

export function useReadingBook(bookid, user) {
  const [contentBook, setContentBook] = useState([]);
  const [pageNumer, setPageNumer] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [gridDirection, setGridDirection] = useState(null);
  const [gridNumRows, setGridNumRows] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [error, setError] = useState(null);

  // Cargar el libro completo al montar
  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fullBook(bookid);
        const bookContent = res.data.book_content || [];
        setContentBook(bookContent);
        setPagesCount(bookContent.length);
        if (bookContent.length > 0) {
          setPageNumer(0);
        }
      } catch (err) {
        setError("Error loading book");
      }
    }
    if (bookid) fetchBook();
  }, [bookid]);

  // Actualizar datos de la página actual
  useEffect(() => {
    if (contentBook.length > 0 && contentBook[pageNumer]) {
      const currentPage = contentBook[pageNumer];
      setGridDirection(currentPage.page?.gridDirection ?? null);
      setGridNumRows(currentPage.page?.gridNumRows ?? null);
      setWidgets(currentPage.widgetitems ?? []);
      setPageData(currentPage.page?.data ?? null);
    } else {
      setWidgets([]);
      setPageData(null);
    }
  }, [contentBook, pageNumer]);

  // Navegación
  const handlePreviousPage = () => {
    if (pageNumer > 0) setPageNumer(pageNumer - 1);
  };
  const handleNextPage = () => {
    if (pageNumer < pagesCount - 1) setPageNumer(pageNumer + 1);
  };

  // Dummy para quiz y badges
  const quizTotalPoints = 0;
  const quizResponses = {};
  const handleQuizResponse = () => {};
  const ExitReading = () => {};
  const ForceExitReading = () => {};
  const currentBadge = null;

  return {
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
    contentBook,
  };
}
