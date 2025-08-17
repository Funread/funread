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
        setElements(widgetValue);
      } else {
        // If the widget's value already includes options (embedded answers), prefer them
        const embeddedOptions = Array.isArray(widgetValue?.options) && widgetValue.options.length > 0 ? widgetValue.options : null;
        if (embeddedOptions) {
          setElements(formatQuizData(widgetValue, embeddedOptions, currentPage));
        } else {
          const options = await list_options_by_idwidgetitem(getWidgetInfo.widgetitemid);
          setElements(formatQuizData(widgetValue, options, currentPage));
        }
      }
    }
  } else if (type === 2) {
    const widgetItem = page.widgetitems?.[0];
    const rawValue = widgetItem?.value;

    if (Array.isArray(rawValue)) {
      setElements(rawValue);
    } else if (typeof rawValue === "object" && rawValue !== null) {
      setElements([rawValue]);
    } else {
      const storedPages = JSON.parse(localStorage.getItem("savedPages") || "{}");
      const localPage = storedPages[page.page.pageid];
      if (Array.isArray(localPage)) {
        setElements(localPage);
      } else {
        setElements([]);
      }
    }
  } else if (type === 5) {
    setElements(page.widgetitems?.[0]?.value || []);
  } else {
    console.warn("Tipo de página no soportado:", page.page.type);
    setElements([]);
  }
}