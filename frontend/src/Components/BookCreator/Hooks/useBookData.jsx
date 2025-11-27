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
      // Hacer copia profunda del book_content para evitar referencias compartidas entre páginas
      const bookContent = JSON.parse(JSON.stringify(fullbook2.data.book_content));
      setPagesList(bookContent);
      if (onLoadPageControl) {
        onLoadPageControl(bookContent[currentPage]);
      }
  
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [id, onLoadPageControl]);


  return { bookData, pagesList, setPagesList, isLoading, error, loadBookData };
}
