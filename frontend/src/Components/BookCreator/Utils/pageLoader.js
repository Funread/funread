import { list_options_by_idwidgetitem } from "../../../api/options";
import { formatQuizData } from "./formatters";

export async function handlePageLoad(page, setElements, setPagesType, currentPage) {
  if (!page || !page.page) return;

  // Tratar tipo 1 igual que tipo 2 (canvas)
  let type = page.page.type;
  if (type === 1) type = 2;
  setPagesType(type);

  if (type === 4) {
    const getWidgetInfo = page.widgetitems?.[0];
    if (getWidgetInfo) {
      const widgetValue = getWidgetInfo.value || {};

      if (widgetValue && widgetValue.type === "COMPLETE") {
        // CRITICAL: Hacer copia profunda para evitar compartir referencias entre páginas
        setElements(JSON.parse(JSON.stringify(widgetValue)));
      } else {
        // If the widget's value already includes options (embedded answers), prefer them
        const embeddedOptions = Array.isArray(widgetValue?.options) && widgetValue.options.length > 0 ? widgetValue.options : null;
        if (embeddedOptions) {
          // formatQuizData ya devuelve un objeto nuevo, pero aseguramos copia profunda
          const formattedData = formatQuizData(widgetValue, embeddedOptions, currentPage);
          setElements(JSON.parse(JSON.stringify(formattedData)));
        } else {
          const options = await list_options_by_idwidgetitem(getWidgetInfo.widgetitemid);
          const formattedData = formatQuizData(widgetValue, options, currentPage);
          setElements(JSON.parse(JSON.stringify(formattedData)));
        }
      }
    }
  } else if (type === 2) {
    const widgetItem = page.widgetitems?.[0];
    const rawValue = widgetItem?.value;

    if (Array.isArray(rawValue)) {
      // CRITICAL: Hacer copia profunda para evitar compartir referencias entre páginas
      setElements(JSON.parse(JSON.stringify(rawValue)));
    } else if (typeof rawValue === "object" && rawValue !== null) {
      // CRITICAL: Hacer copia profunda para evitar compartir referencias entre páginas
      setElements([JSON.parse(JSON.stringify(rawValue))]);
    } else {
      const storedPages = JSON.parse(localStorage.getItem("savedPages") || "{}");
      const localPage = storedPages[page.page.pageid];
      if (Array.isArray(localPage)) {
        setElements(JSON.parse(JSON.stringify(localPage)));
      } else {
        setElements([]);
      }
    }
  } else if (type === 5) {
    // CRITICAL: Hacer copia profunda para evitar compartir referencias entre páginas
    console.log('=== Loading Game (Type 5) ===');
    console.log('Page:', page);
    console.log('Widgetitems:', page.widgetitems);
    const gameValue = page.widgetitems?.[0]?.value;
    console.log('Game value:', gameValue);
    console.log('Game value type:', typeof gameValue);
    if (gameValue) {
      const deepCopy = JSON.parse(JSON.stringify(gameValue));
      console.log('Setting elements with deep copy:', deepCopy);
      setElements(deepCopy);
    } else {
      console.log('No game value, setting empty array');
      setElements([]);
    }
  } else {
    console.warn("Tipo de página no soportado:", page.page.type);
    setElements([]);
  }
}