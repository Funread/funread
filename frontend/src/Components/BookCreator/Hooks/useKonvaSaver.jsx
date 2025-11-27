import { useCallback } from "react";
import { updateWidgetItem } from "../../../api/widget";
import { updatePageType } from "../../../api/pages";
import { toast } from "react-toastify";

export function useKonvaSaver({ elements, pagesList, currentPage, setPagesList }) {
  const saveKonva = useCallback(() => {
    if (!pagesList || !pagesList[currentPage] || !pagesList[currentPage].page) {
      alert("Página no disponible");
      return;
    }

    const currentPageId = pagesList[currentPage].page.pageid;
    const widgetitemid = pagesList[currentPage].widgetitems[0].widgetitemid;
    const widgetId = 9;

    // Dividir elementos en background y los demás
    let background = null;
    const otherElements = [];

    elements.forEach(el => {
      const base = {
        x: el.x || 0,
        y: el.y || 0,
        width: el.width,
        height: el.height,
        id: el.id,
        type: el.type
      };

      if (el.type === "image" && el.isBackground) {
        background = {
          ...base,
          src: el.src
        };
      } else if (el.type === "image") {
        otherElements.push({
          ...base,
          src: el.src
        });
      } else if (el.type === "text") {
        otherElements.push({
          ...base,
          text: el.text,
          fontSize: el.fontSize,
          fontWeight: el.fontWeight,
          fontStyle: el.fontStyle,
          fontFamily: el.fontFamily,
          fill: el.fill,
          backgroundColor: el.backgroundColor,
          stroke: el.stroke,
          strokeWidth: el.strokeWidth,
          opacity: el.opacity,
          rotation: el.rotation,
          lineHeight: el.lineHeight,
          shadowColor: el.shadowColor,
          shadowBlur: el.shadowBlur,
          shadowOffsetX: el.shadowOffsetX,
          shadowOffsetY: el.shadowOffsetY,
          textDecoration: el.textDecoration
        });
      }
    });

    // Crear el value completo como arreglo de elementos
    const finalValue = [];

    if (background) finalValue.push({ ...background, type: "background" });
    finalValue.push(...otherElements);

    // CRITICAL: Primero actualizar el tipo de página a Canvas (tipo 2), luego guardar el widget
    updatePageType(currentPageId, 2)
      .then(() => updateWidgetItem(widgetitemid, currentPageId, widgetId, 2, finalValue, 1))
      .then(() => {
        if (setPagesList) {
          const pageIndex = currentPage;
          setPagesList(prev => {
            // Hacer copia profunda de TODO el array para romper cualquier referencia compartida
            const updated = JSON.parse(JSON.stringify(prev));
            if (updated[pageIndex] && updated[pageIndex].widgetitems && updated[pageIndex].widgetitems[0]) {
              // Actualizar solo la página actual con copia profunda del nuevo valor
              updated[pageIndex].widgetitems[0].value = JSON.parse(JSON.stringify(finalValue));
            }
            return updated;
          });
        }
        toast.success(`Página ${currentPage + 1} guardada correctamente`);
      })
      .catch((e) => console.error("Error guardando elementos konva", e));

  }, [elements, pagesList, currentPage, setPagesList]);

  return { saveKonva };
}
