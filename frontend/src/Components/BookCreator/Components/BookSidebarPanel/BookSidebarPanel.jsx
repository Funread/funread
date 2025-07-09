// src/Components/BookCreator/components/BookSidebarPanel.jsx
import ImagePanel from "./ImagePanel";
import TextPanel from "./TextPanel";
import Games from "./Games";
import Quiz from "./Quiz";

export default function BookSidebarPanel({
  openPanel,
  widgetValidation,
  setElements,
  setImages,
  changeQuizType,
}) {
  if (
    ["background", "objects", "users", "shape"].includes(openPanel)
  ) {
    return (
      <ImagePanel
        widgetValidation={widgetValidation}
        setElements={setElements}
        setImages={setImages}
        imageType={openPanel}
      />
    );
  }
  if (openPanel === "text") {
    return (
      <TextPanel
        widgetValidation={widgetValidation}
        setElements={setElements}
      />
    );
  }
  if (openPanel === "games") {
    return (
      <Games
        widgetValidation={widgetValidation}
        setElements={setElements}
      />
    );
  }
  if (openPanel === "quiz") {
    return (
      <Quiz
        widgetValidation={widgetValidation}
        setElements={setElements}
        changeQuizType={changeQuizType}
      />
    );
  }
  return null;
}
