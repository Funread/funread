import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './ReadingView.sass';
import RV_ImageWithText from './Widgets/Media/RV_ImageWithText';
 

function ReadingView() {
  const goToNextPage = () => {
    // Lógica para ir a la siguiente página
  };

  const goToPreviousPage = () => {
    // Lógica para ir a la página anterior
  };

  const exitPresentation = () => {
    // Lógica para salir de la presentación
  };
  return (
    <div className="presentation-container">
      <div className="top-menu">
        <button onClick={(function() {
  console.log('This will run right away!');
})}>Back</button>
      <button onClick={(function() {
  console.log('This will run right away!');
})}>Atrás</button>   <button onClick={(function() {
  console.log('This will run right away!');
})}>Next</button>
      </div>
      <div className="slide-content">
      <RV_ImageWithText textbackgroundColor="#355377" textColor="#FFFFFF" />
      </div>
    </div>
  );
}

export default ReadingView;
