import { useCallback } from "react";
import { newWidgetItem } from "../../../api/widget";


export function useKonvaSaver({ elements, pagesList, currentPage, updatePageType }) {
  const saveKonva = useCallback(() => {
    if (!pagesList || !pagesList[currentPage] || !pagesList[currentPage].page) {
      alert("Página no disponible");
      return;
    }
    const storedPages = JSON.parse(localStorage.getItem("savedPages")) || {};
    const currentPageId = pagesList[currentPage].page.pageid;
    const widgetId = 9;
    updatePageType(currentPageId, 2);
    storedPages[currentPage] = elements;
    localStorage.setItem("savedPages", JSON.stringify(storedPages));

    elements.forEach((el, index) => {
      let value = null;
      if (el.type === "image") {
        value = {
          x: el.x || 0,
          y: el.y || 0,
          src: el.src,
          width: el.width,
          height: el.height
        };
      } else if (el.type === "text") {
        value = { data: `<p>${el.text || ""}</p>` };
      } else {
        return;
      }
      newWidgetItem(currentPageId, widgetId, 2, value, index + 1).catch((e) =>
        console.error("Error guardando elemento konva", e)
      );
    });
    alert(`Página ${currentPage + 1} guardada correctamente`);
  }, [elements, pagesList, currentPage, updatePageType]);

  return { saveKonva };
}
