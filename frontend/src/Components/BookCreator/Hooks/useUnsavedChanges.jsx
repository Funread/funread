import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook para detectar cambios no guardados y solicitar confirmación antes de cambiar de página
 * 
 * @param {Object} params
 * @param {Array} params.elements - Elementos actuales de la página
 * @param {number} params.currentPage - Índice de la página actual
 * @param {Array} params.pagesList - Lista de todas las páginas
 * @param {Function} params.savePage - Función para guardar la página actual
 * @returns {Object} - Funciones para manejar la navegación con confirmación
 */
export function useUnsavedChanges({ elements, currentPage, pagesList, savePage }) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingPageChange, setPendingPageChange] = useState(null);
  const initialElementsRef = useRef(null);
  const lastSavedElementsRef = useRef(null);
  const isLoadingPageRef = useRef(false);
  const pendingNavigationRef = useRef(null);

  // Guardar elementos iniciales cuando se carga una página
  useEffect(() => {
    // Marcar que estamos cargando una nueva página
    isLoadingPageRef.current = true;
    setHasUnsavedChanges(false);
    
    // Esperar a que los elementos se carguen
    const timer = setTimeout(() => {
      const elementsStr = JSON.stringify(elements);
      initialElementsRef.current = elementsStr;
      lastSavedElementsRef.current = elementsStr;
      isLoadingPageRef.current = false;
    }, 300);
    
    return () => {
      clearTimeout(timer);
      isLoadingPageRef.current = false;
    };
  }, [currentPage, pagesList]); // Añadido pagesList para detectar cuando se recarga la data

  // Detectar cambios en los elementos
  useEffect(() => {
    // No detectar cambios mientras se carga la página
    if (isLoadingPageRef.current) {
      return;
    }
    
    const currentElementsStr = JSON.stringify(elements);
    
    // Si no hay referencia guardada, establecerla y salir
    if (lastSavedElementsRef.current === null) {
      lastSavedElementsRef.current = currentElementsStr;
      return;
    }
    
    // Comparar con los elementos iniciales de la página (no con el último guardado)
    // Esto evita que se marque como modificado si la página viene vacía de la BD
    const hasChangedFromInitial = currentElementsStr !== initialElementsRef.current;
    
    // Solo marcar como no guardado si hay cambios reales desde que se cargó la página
    if (hasChangedFromInitial) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [elements]);

  /**
   * Verifica si la página tiene contenido significativo
   */
  const hasPageContent = (els) => {
    if (!els) return false;
    
    // Para arrays (Canvas)
    if (Array.isArray(els)) {
      return els.length > 0;
    }
    
    // Para objetos (Quiz/WordSearch)
    if (typeof els === 'object') {
      // Quiz Complete
      if (els.content) {
        const { title, question, correctAnswer } = els.content;
        if (title || question || correctAnswer) return true;
      }
      
      // Quiz Single Choice
      if (els.options && Array.isArray(els.options)) {
        const hasOptions = els.options.some(opt => opt.answer && opt.answer.trim() !== '');
        if (hasOptions) return true;
      }
      
      // Word Search
      if (els.words && Array.isArray(els.words)) {
        const hasWords = els.words.some(word => word && word.trim() !== '');
        if (hasWords) return true;
      }
      
      // Verificar otros campos comunes
      if (els.title || els.question) {
        const titleValid = els.title && els.title !== 'Nuevo Quiz' && els.title !== 'Word Search Puzzle';
        const questionValid = els.question && els.question !== 'Escribe la pregunta aquí';
        if (titleValid || questionValid) return true;
      }
    }
    
    return false;
  };

  /**
   * Maneja el intento de cambio de página con confirmación
   */
  const handlePageChangeRequest = useCallback((newPageIndex, setCurrentPageFn) => {
    // Si no hay cambios sin guardar, cambiar directamente
    if (!hasUnsavedChanges) {
      setCurrentPageFn(newPageIndex);
      return;
    }

    // Si hay cambios sin guardar, autoguardar antes de cambiar de página
    const saveResult = savePage();
    
    // Verificar si savePage retorna una Promise
    if (saveResult && typeof saveResult.then === 'function') {
      saveResult
        .then(() => {
          const elementsStr = JSON.stringify(elements);
          lastSavedElementsRef.current = elementsStr;
          initialElementsRef.current = elementsStr;
          setHasUnsavedChanges(false);
          setCurrentPageFn(newPageIndex);
        })
        .catch((error) => {
          console.error('Error saving page:', error);
          alert('Error al guardar la página. Por favor, intenta de nuevo.');
        });
    } else {
      // Si no es una Promise, asumir que guardó correctamente
      const elementsStr = JSON.stringify(elements);
      lastSavedElementsRef.current = elementsStr;
      initialElementsRef.current = elementsStr;
      setHasUnsavedChanges(false);
      setCurrentPageFn(newPageIndex);
    }
  }, [elements, hasUnsavedChanges, savePage]);

  /**
   * Maneja la acción de guardar desde el modal
   */
  const handleSave = useCallback(() => {
    if (!pendingNavigationRef.current) return;
    
    const { newPageIndex, setCurrentPageFn } = pendingNavigationRef.current;
    const saveResult = savePage();
    
    // Verificar si savePage retorna una Promise
    if (saveResult && typeof saveResult.then === 'function') {
      saveResult
        .then(() => {
          lastSavedElementsRef.current = JSON.stringify(elements);
          setHasUnsavedChanges(false);
          setShowModal(false);
          setCurrentPageFn(newPageIndex);
          pendingNavigationRef.current = null;
        })
        .catch((error) => {
          console.error('Error saving page:', error);
          alert('Error saving page. Please try again.');
        });
    } else {
      // Si no es una Promise, asumir que guardó correctamente
      lastSavedElementsRef.current = JSON.stringify(elements);
      setHasUnsavedChanges(false);
      setShowModal(false);
      setCurrentPageFn(newPageIndex);
      pendingNavigationRef.current = null;
    }
  }, [elements, savePage]);

  /**
   * Maneja la acción de descartar cambios desde el modal
   */
  const handleDiscard = useCallback(() => {
    if (!pendingNavigationRef.current) return;
    
    const { newPageIndex, setCurrentPageFn } = pendingNavigationRef.current;
    setHasUnsavedChanges(false);
    setShowModal(false);
    setCurrentPageFn(newPageIndex);
    pendingNavigationRef.current = null;
  }, []);

  /**
   * Maneja la acción de cancelar desde el modal
   */
  const handleCancel = useCallback(() => {
    setShowModal(false);
    pendingNavigationRef.current = null;
  }, []);

  /**
   * Marca la página como guardada (llamar después de guardar exitosamente)
   */
  const markAsSaved = useCallback(() => {
    const elementsStr = JSON.stringify(elements);
    lastSavedElementsRef.current = elementsStr;
    initialElementsRef.current = elementsStr;
    setHasUnsavedChanges(false);
  }, [elements]);

  return {
    hasUnsavedChanges,
    handlePageChangeRequest,
    markAsSaved,
    showModal,
    handleSave,
    handleDiscard,
    handleCancel,
  };
}
