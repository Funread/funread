import React from "react";

import "./Grids.css";
// import CollageGridPlaceHolder from "./CollageGrid/CollageGridPlaceholder";
// import DoubleGridHorizontalPlaceHolder from "./DoubleGridHorizontal/DoubleGridPlaceholder";
// import DoubleGridVertical from "./DoubleGridVertical/DoubleGridVerticalPlaceholder";
// import FullGridPlaceHolder from "./FullGrid/FullGridPlaceholder";
// import QuadrupleGridPlaceHolder from "./QuadrupleGrid/QuadrupleGridPlaceholder";
import TripleGridHorizontalPlaceHolder from "./TripleGridHorizontal/TripleGridHorizontalPlaceholder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function Grids() {
  return (
    <div className="Grids">
      <DndProvider backend={HTML5Backend}>
        <TripleGridHorizontalPlaceHolder></TripleGridHorizontalPlaceHolder>
      </DndProvider>
    </div>
  );
}

export default Grids;
