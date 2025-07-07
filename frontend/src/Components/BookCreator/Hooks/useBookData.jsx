// hooks/useBookData.js
import { useState, useCallback } from "react";
import { fullBook } from "../../../api/books";

export function useBookData(id, onLoadPageControl) {
  const [bookData, setBookData] = useState(null);
  const [pagesList, setPagesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBookData = useCallback(async (currentPage = 0) => {
    setIsLoading(true);
    setError(null);
    try {
      const [fullbook2] = await Promise.all([fullBook(id)]);
      setBookData(fullbook2.data.book_details);
      setPagesList(fullbook2.data.book_content);
      if (onLoadPageControl) {
        onLoadPageControl(fullbook2.data.book_content[currentPage]);
      }
    } catch (err) {
      setError(err);
      console.error("Error al cargar el libro:", err);
    } finally {
      setIsLoading(false);
    }
  }, [id, onLoadPageControl]);

  return { bookData, pagesList, isLoading, error, loadBookData };
}
