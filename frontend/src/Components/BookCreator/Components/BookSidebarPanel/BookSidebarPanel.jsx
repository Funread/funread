// src/Components/BookCreator/components/BookSidebarPanel.jsx
import ImagePanel from "./ImagePanel";
import TextPanel from "./TextPanel";
import Games from "./Games";
import Quiz from "./Quiz";
import SideBar from "./SideBar";
import  React, { useState } from "react";
export default function BookSidebarPanel({
  widgetValidation,
  setElements,
  setImages,
  changeQuizType,
  savePage,
  hasUnsavedChanges,
}) {
  const [openPanel, setOpenPanel] = useState("background");
  return (
    <div className="flex flex-row h-full min-h-screen min-w-0">
      {/* Sidebar */}
  <SideBar openPanel={openPanel} setOpenPanel={setOpenPanel} savePage={savePage} hasUnsavedChanges={hasUnsavedChanges} />
      {/* Panel lateral */}
      <div className="flex flex-col w-[300px] h-full min-h-screen min-w-0 bg-white shadow-md p-4 border-r border-gray-300 overflow-y-auto">
        {(["background", "custom", "objects", "users", "shape"].includes(openPanel)) && (
          <ImagePanel
            widgetValidation={widgetValidation}
            setElements={setElements}
            setImages={setImages}
            imageType={openPanel}
          />
        )}
        {openPanel === "text" && (
          <TextPanel
            widgetValidation={widgetValidation}
            setElements={setElements}
          />
        )}
        {openPanel === "games" && (
          <Games
            widgetValidation={widgetValidation}
            setElements={setElements}
          />
        )}
        {openPanel === "quiz" && (
          <Quiz
            widgetValidation={widgetValidation}
            setElements={setElements}
            changeQuizType={changeQuizType}
          />
        )}
      </div>
    </div>
  );
}
