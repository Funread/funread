import React from 'react';

import './Grids.css';
import PlaceHolder from './CollageGrid/CollageGridPlaceholder';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
function Grids() {
  return (
    <div className="Grids">
      <DndProvider backend={HTML5Backend}>
      <PlaceHolder></PlaceHolder>
      </DndProvider>
    </div>
  );
}

export default Grids;