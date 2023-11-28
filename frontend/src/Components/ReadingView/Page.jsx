import React from 'react';
import  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './ReadingView.sass';
import RV_ImageWithText from './Widgets/Media/RV_ImageWithText';
 

function ReadingView() 
  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="hoja">
         
         
         <RV_ImageWithText textbackgroundColor="#355377" textColor="#FFFFFF" />
         
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary">Atrás</button>
          <button className="btn btn-primary">Siguiente</button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ReadingView;
