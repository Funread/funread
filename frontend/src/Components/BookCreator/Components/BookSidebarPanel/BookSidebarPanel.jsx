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
}) {
    const [openPanel, setOpenPanel] = useState("background");
  if (
    ["background", "objects", "users", "shape"].includes(openPanel)
  ) {
    return (
      <React.Fragment>
            <SideBar openPanel={openPanel} setOpenPanel={setOpenPanel} />
            <div className="w-[300px] h-full bg-white shadow-md p-4 fixed left-16 top-0 border-r border-gray-300 overflow-y-auto">
              <ImagePanel
                widgetValidation={widgetValidation}
                setElements={setElements}
                setImages={setImages}
                imageType={openPanel}
              />
             </div> 
      </React.Fragment>
   
    );
  }
  if (openPanel === "text") {
    return (
      <React.Fragment>
        <SideBar openPanel={openPanel} setOpenPanel={setOpenPanel} />
        <div className="w-[300px] h-full bg-white shadow-md p-4 fixed left-16 top-0 border-r border-gray-300 overflow-y-auto">
            <TextPanel
            widgetValidation={widgetValidation}
            setElements={setElements}
          />
        </div> 
        </React.Fragment>
   
    );
  }
  if (openPanel === "games") {
    return (

      <React.Fragment>
        <SideBar openPanel={openPanel} setOpenPanel={setOpenPanel} />
        <div className="w-[300px] h-full bg-white shadow-md p-4 fixed left-16 top-0 border-r border-gray-300 overflow-y-auto">
            <Games
            widgetValidation={widgetValidation}
            setElements={setElements}
          />
        </div> 
        </React.Fragment>
    );
  }
  if (openPanel === "quiz") {
    return (
      <React.Fragment>
      <SideBar openPanel={openPanel} setOpenPanel={setOpenPanel} />
      <div className="w-[300px] h-full bg-white shadow-md p-4 fixed left-16 top-0 border-r border-gray-300 overflow-y-auto">
        <Quiz
          widgetValidation={widgetValidation}
          setElements={setElements}
          changeQuizType={changeQuizType}
        />
      </div> 
      </React.Fragment>
  
    );
  }
  return null;
}
