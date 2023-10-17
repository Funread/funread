import React from "react";

import "./Grids.css";
import CollageGridPlaceholder from "./CollageGrid/CollageGridPlaceholder";
import DoubleGridPlaceholder from "./DoubleGridHorizontal/DoubleGridPlaceholder";
import DoubleGridVerticalPlaceholder from "./DoubleGridVertical/DoubleGridVerticalPlaceholder";
import FullGridPlaceholder from "./FullGrid/FullGridPlaceholder";
import QuadrupleGridPlaceholder from "./QuadrupleGrid/QuadrupleGridPlaceholder";
import TripleGridHorizontalPlaceholder from "./TripleGridHorizontal/TripleGridHorizontalPlaceholder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Grids(props) {
  const choiseGrid = () => {
    switch (props.gridId) { //este orden  puede cambiarse
      case 1:
        return(<CollageGridPlaceholder></CollageGridPlaceholder>);
      case 2:
        return(<DoubleGridPlaceholder></DoubleGridPlaceholder>);
      case 3:
        return(<DoubleGridVerticalPlaceholder></DoubleGridVerticalPlaceholder>);
      case 4:
        return(<FullGridPlaceholder></FullGridPlaceholder>);
      case 5:
        return(<QuadrupleGridPlaceholder></QuadrupleGridPlaceholder>);
      case 6:
        return(<TripleGridHorizontalPlaceholder></TripleGridHorizontalPlaceholder>);
      default:
        return(<FullGridPlaceholder></FullGridPlaceholder>);
    }
  }
  
  
  
  
  return (
    <div className="Grids">
      <DndProvider backend={HTML5Backend}>
        {choiseGrid()}
      </DndProvider>
    </div>
  );
}

export default Grids;
