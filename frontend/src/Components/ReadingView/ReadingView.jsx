import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './ReadingView.sass';
import Page from './Page';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function ReadingView() {
  const handle = useFullScreenHandle();
  
  const goToNextPage = () => {
    // Lógica para ir a la siguiente página
  };

  const goToPreviousPage = () => {
    // Lógica para ir a la página anterior
  };

  const exitPresentation = () => {
    handle.exit(); // Sale del modo pantalla completa
  };
  return (
    <FullScreen handle={handle}>
    <div className="presentation-container">
      <div className="top-menu">
          <button onClick={goToPreviousPage}>Back</button>
          <button onClick={exitPresentation}>Salir</button>
          <button onClick={goToNextPage}>Next</button>
      </div>

      <Page/> 

    </div>
    </FullScreen>
  );
}

export default ReadingView;
