import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { newPageWithWidgets } from "../Utils/newPageWithWidgets";
import { useState as useReactState } from "react";
import SessionExpiredModal from "../Components/SessionExpiredModal";

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
  const [showSessionModal, setShowSessionModal] = useReactState(false);
  const navigate = useNavigate();

  // ---- Agregar página ----
  const addPage = useCallback(async () => {
    setPageLoading(true);
    setPageError(null);

    try {
      // Calcular el elementorder máximo de las páginas existentes
      const maxElementOrder = pagesList.reduce((max, pageData) => {
        const order = pageData?.page?.elementorder || 0;
        return Math.max(max, order);
      }, 0);
      
      const newElementOrder = maxElementOrder + 1;
      const nextPageIndex = pagesList.length;
      
      await newPageWithWidgets(
        id,
        2,// Siempre vamos a agregar una pagina de tipo konva por default
        0,
        newElementOrder,
        "1",
        1
      );
      await loadBookData(nextPageIndex);
      setCurrentPage(nextPageIndex);
      setElements([]);
    } catch (error) {
      setPageError(error);
      if (error?.response?.status === 401) {
        setShowSessionModal(true);
      }
      console.error("Error al agregar página:", error);
    } finally {
      setPageLoading(false);
    }
  }, [id, pagesList, loadBookData, setCurrentPage, setElements]);

  const handleSessionModalClose = () => {
    setShowSessionModal(false);
    navigate("/");
  };

  // ---- Limpiar elementos de la página ----
  const cleanElements = useCallback(() => {
    setElements([]);
    setSelectedId(null);
  }, [setElements, setSelectedId]);

  // Renderizar el modal si es necesario
  const SessionModal = showSessionModal ? (
    <SessionExpiredModal show={showSessionModal} onClose={handleSessionModalClose} />
  ) : null;

  return {
    addPage,
    cleanElements,
    pageLoading,
    pageError,
    SessionModal,
  };
}
