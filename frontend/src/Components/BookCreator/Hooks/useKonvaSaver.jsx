import { useCallback } from "react";
import { updateWidgetItem } from "../../../api/widget";

export function useKonvaSaver({ elements, pagesList, currentPage }) {
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
          fill: el.fill
        });
      }
    });

    // Crear el value completo como arreglo de elementos
    const finalValue = [];

    if (background) finalValue.push({ ...background, type: "background" });
    finalValue.push(...otherElements);

    // Guardar en un solo widgetitem
    updateWidgetItem(widgetitemid, currentPageId, widgetId, 2, finalValue, 1)
      .then(() => alert(`Página ${currentPage + 1} guardada correctamente`))
      .catch((e) => console.error("Error guardando elementos konva", e));

  }, [elements, pagesList, currentPage]);

  return { saveKonva };
}
