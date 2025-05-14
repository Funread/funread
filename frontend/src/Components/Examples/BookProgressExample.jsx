// filepath: c:\Users\Zana\Documents\FunreadNew\funread\frontend\src\api\usageExample.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getBookProgress, markBookAsCompleted } from "./userBookProgress";

/**
 * Este es un ejemplo de cómo utilizar las funciones que consumen las APIs
 * de get-progress y mark-as-completed. No está pensado para ser usado directamente,
 * sino para servir como guía para la implementación real en los componentes.
 */
const BookProgressExample = ({ bookId }) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Función para cargar el progreso del libro
    const loadBookProgress = async () => {
      try {
        setLoading(true);
        const response = await getBookProgress(user.userId, bookId);
        setProgress(response.data);
      } catch (error) {
        console.error("Error al cargar el progreso:", error);
        setError("No se pudo cargar el progreso del libro");
      } finally {
        setLoading(false);
      }
    };

    if (user.userId && bookId) {
      loadBookProgress();
    }
  }, [user.userId, bookId]);

  // Función para marcar el libro como completado con calificación 100
  const handleMarkAsCompleted = async () => {
    try {
      setLoading(true);
      const response = await markBookAsCompleted(user.userId, bookId);
      setProgress(response.data);
      // Mostrar notificación o mensaje de éxito
      alert("Libro marcado como completado con éxito");
    } catch (error) {
      console.error("Error al marcar como completado:", error);
      setError("No se pudo marcar el libro como completado");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando progreso...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Progreso del Libro</h3>
      {progress ? (
        <div>
          <p>
            Estado:{" "}
            {progress.status === 0
              ? "Por leer"
              : progress.status === 1
              ? "Completado"
              : "En progreso"}
          </p>
          <p>
            Calificación:{" "}
            {progress.calificacion
              ? `${progress.calificacion}%`
              : "No calificado"}
          </p>

          {progress.status !== 1 && (
            <button onClick={handleMarkAsCompleted}>
              Marcar como completado con 100%
            </button>
          )}
        </div>
      ) : (
        <p>No hay progreso registrado para este libro.</p>
      )}
    </div>
  );
};

export default BookProgressExample;
