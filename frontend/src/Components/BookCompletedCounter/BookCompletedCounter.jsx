import React, { useState, useEffect } from "react";
import { getBooksCompleted } from "../../api/userBookProgress";
import "./BookCompletedCounter.css";

/**
 * Componente que muestra el contador de libros completados por un usuario
 * @param {Object} props - Props del componente
 * @param {number} props.userId - ID del usuario
 */
const BookCompletedCounter = ({ userId }) => {
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedBooks = async () => {
      try {
        setLoading(true);
        const response = await getBooksCompleted(userId);
        setCompletedCount(response.data.completed_books);
        setError(null);
      } catch (err) {
        console.error("Error fetching completed books count:", err);
        setError("No se pudo cargar la cantidad de libros completados");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCompletedBooks();
    }
  }, [userId]);

  if (loading) {
    return <div className="book-counter-loading">Cargando...</div>;
  }

  if (error) {
    return <div className="book-counter-error">{error}</div>;
  }

  return (
    <div className="book-completed-counter">
      <div className="counter-container">
        <span className="counter-number">{completedCount}</span>
        <span className="counter-label">
          {completedCount === 1 ? "Libro Completado" : "Libros Completados"}
        </span>
      </div>
    </div>
  );
};

export default BookCompletedCounter;
