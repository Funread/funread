import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Page.sass';
import RV_ImageWithText from './Widgets/Media/RV_ImageWithText';
 

function Page( {gridDirection, gridNumRows,pageNumer , widgets}) {


  const getGrid = () => { 
    // console.log(book_content.contentBook.page) 
 
    let direction=  gridDirection
    let numRows= gridNumRows
      if (direction === 'horizontal' && numRows === 1) {
        // return 'FullSingleGrid';
        return  <RV_ImageWithText textbackgroundColor="#355377" textColor="#FFFFFF" />
      } else if (direction === 'vertical' && numRows === 1) {
        return 'SplitVerticalGrid';
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

export default Page;
