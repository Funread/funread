import { useState, useCallback } from "react";
import { newPage } from "../../../api/pages"; // Ajusta la ruta a tu proyecto

export function usePages({
  id,
  loadBookData,
  setCurrentPage,
  setElements,
  setSelectedId,
  pagesList
}) {
  // Estado local si quieres loading o error en estas acciones
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState(null);

  // ---- Agregar página ----
  const addPage = useCallback(async (type = 2) => {
    setPageLoading(true);
    setPageError(null);
    try {
      const nextPageIndex = pagesList.length;
      await newPage(
        id,
        type, // usa el tipo que recibas
        0,
        nextPageIndex + 1,
        "1",
        1
      );
      await loadBookData();
      setCurrentPage(nextPageIndex);
      setElements([]);
    } catch (error) {
      setPageError(error);
      console.error("Error al agregar página:", error);
    } finally {
      setPageLoading(false);
    }
  }, [id, pagesList, loadBookData, setCurrentPage, setElements]);

  // ---- Limpiar elementos de la página ----
  const cleanElements = useCallback(() => {
    setElements([]);
    setSelectedId(null);
  }, [setElements, setSelectedId]);

  return {
    addPage,
    cleanElements,
    pageLoading,
    pageError,
  };
}
