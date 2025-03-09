import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './GridPage.sass';
import RV_ImageWithText from '../Widgets/Media/RV_ImageWithText';
import Image from '../Widgets/Media/Image';
 

function GridPage( {gridDirection, gridNumRows, pageNumer , widgets}) {


  const getGrid = () => { 
    console.log(gridDirection) 
    console.log(gridNumRows) 
    console.log(widgets) 
    let direction=  gridDirection
    let numRows= gridNumRows
      if (direction === 'horizontal' && numRows === 1) {
        // return 'FullSingleGrid';
        return  <Image textbackgroundColor="#355377" textColor="#FFFFFF" img= {widgets[0]} />
      } 
      
      else if (direction === 'horizontalBigFirst' && numRows === 2) {
       
        return <RV_ImageWithText textbackgroundColor="#355377" textColor="#FFFFFF" text={widgets[0].value} img ={widgets[1].value}/>
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
