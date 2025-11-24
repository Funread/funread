import { useState, useCallback } from "react";
import { deletePage as deletePageAPI, swapPages as swapPagesAPI } from "../../../api/pages";

/**
 * Hook personalizado para gestionar operaciones de páginas:
 * - Eliminar páginas
 * - Intercambiar páginas
 * 
 * @param {Object} params
 * @param {Function} params.loadBookData - Función para recargar los datos del libro
 * @param {Array} params.pagesList - Lista actual de páginas
 * @param {number} params.currentPage - Índice de la página actual
 * @param {Function} params.setCurrentPage - Función para establecer la página actual
 * @param {Function} params.onError - Callback opcional para manejar errores
 */
export function usePageManagement({
  loadBookData,
  pagesList,
  currentPage,
  setCurrentPage,
  onError
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Elimina una página específica
   * @param {number} pageIndex - Índice de la página a eliminar
   */
  const handleDeletePage = useCallback(async (pageIndex) => {
    if (!pagesList || pagesList.length === 0) {
      const errorMsg = "No hay páginas para eliminar";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }

    if (pagesList.length === 1) {
      const errorMsg = "No puedes eliminar la última página del libro";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }

    const pageToDelete = pagesList[pageIndex];
    if (!pageToDelete?.page?.pageid) {
      const errorMsg = "Página no válida";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }

    // Confirmar eliminación
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar la página ${pageIndex + 1}?`
    );
    
    if (!confirmDelete) return;

    setIsLoading(true);
    setError(null);

    try {
      await deletePageAPI(pageToDelete.page.pageid);
      
      // Si eliminamos la página actual, navegar a la página anterior o la siguiente disponible
      if (pageIndex === currentPage) {
        const newCurrentPage = pageIndex > 0 ? pageIndex - 1 : 0;
        setCurrentPage(newCurrentPage);
      } else if (pageIndex < currentPage) {
        // Si eliminamos una página antes de la actual, ajustar el índice
        setCurrentPage(currentPage - 1);
      }
      
      // Recargar datos del libro
      await loadBookData();
    } catch (err) {
      const errorMsg = err?.response?.data?.error || "Error al eliminar la página";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      console.error("Error al eliminar página:", err);
    } finally {
      setIsLoading(false);
    }
  }, [pagesList, currentPage, setCurrentPage, loadBookData, onError]);

  /**
   * Intercambia la posición de dos páginas
   * @param {number} pageIndex1 - Índice de la primera página
   * @param {number} pageIndex2 - Índice de la segunda página
   */
  const handleSwapPages = useCallback(async (pageIndex1, pageIndex2) => {
    if (!pagesList || pagesList.length < 2) {
      const errorMsg = "Se necesitan al menos 2 páginas para intercambiar";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }

    if (pageIndex1 === pageIndex2) {
      const errorMsg = "No puedes intercambiar una página consigo misma";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }

    const page1 = pagesList[pageIndex1];
    const page2 = pagesList[pageIndex2];

    if (!page1?.page?.pageid || !page2?.page?.pageid) {
      const errorMsg = "Una o ambas páginas no son válidas";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await swapPagesAPI(page1.page.pageid, page2.page.pageid);
      
      // Recargar datos del libro para reflejar el cambio
      await loadBookData();
      
      // Mantener el foco en una de las páginas intercambiadas
      // Si la página actual es una de las intercambiadas, mover a la nueva posición
      if (currentPage === pageIndex1) {
        setCurrentPage(pageIndex2);
      } else if (currentPage === pageIndex2) {
        setCurrentPage(pageIndex1);
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.error || "Error al intercambiar páginas";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      console.error("Error al intercambiar páginas:", err);
    } finally {
      setIsLoading(false);
    }
  }, [pagesList, currentPage, setCurrentPage, loadBookData, onError]);

  /**
   * Mueve una página hacia adelante (incrementa su orden)
   * @param {number} pageIndex - Índice de la página a mover
   */
  const movePageForward = useCallback(async (pageIndex) => {
    if (pageIndex >= pagesList.length - 1) {
      const errorMsg = "Esta página ya está al final";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }
    await handleSwapPages(pageIndex, pageIndex + 1);
  }, [pagesList, handleSwapPages, onError]);

  /**
   * Mueve una página hacia atrás (decrementa su orden)
   * @param {number} pageIndex - Índice de la página a mover
   */
  const movePageBackward = useCallback(async (pageIndex) => {
    if (pageIndex <= 0) {
      const errorMsg = "Esta página ya está al inicio";
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }
    await handleSwapPages(pageIndex, pageIndex - 1);
  }, [handleSwapPages, onError]);

  return {
    handleDeletePage,
    handleSwapPages,
    movePageForward,
    movePageBackward,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
