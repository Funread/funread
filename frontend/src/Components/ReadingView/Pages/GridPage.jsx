import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './GridPage.sass';
import RV_ImageWithText from '../Widgets/Media/RV_ImageWithText';
import Image from '../Widgets/Media/Image';
 

function GridPage( {gridDirection, gridNumRows, pageNumer , widgets}) {


  const getGrid = () => { 
    
    
    
    let direction=  gridDirection
    let numRows= gridNumRows
      // Defensive checks: ensure widgets is an array and has expected indexes
      if (!widgets || !Array.isArray(widgets) || widgets.length === 0) {
        console.warn('GridPage: widgets is empty or invalid', widgets);
        return null;
      }

      if (direction === 'horizontal' && numRows === 1) {
        // return 'FullSingleGrid';
        return  <Image textbackgroundColor="#355377" textColor="#FFFFFF" img={widgets[0]} />
      }

      else if (direction === 'horizontalBigFirst' && numRows === 2) {
        // Ensure the expected widget values exist
        const textVal = widgets[0] ? widgets[0].value : '';
        const imgVal = widgets[1] ? widgets[1].value : null;
        return <RV_ImageWithText textbackgroundColor="#355377" textColor="#FFFFFF" text={textVal} img={imgVal} />
      }
      // Puedes agregar más condiciones aquí para otros tipos de grid
      else {
        return 'UnknownGridType';
      }
    };
   
  return (
    <div className="slide-content">
 {getGrid( )}
    {/* <RV_ImageWithText textbackgroundColor="#355377" textColor="#FFFFFF" /> */}
    </div>
  );
}

export default GridPage;
