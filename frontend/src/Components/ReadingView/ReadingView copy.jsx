import {useCallback,React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './ReadingView.sass';
import Page from './Page';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function ReadingView() {
  const screen1 = useFullScreenHandle();
  const screen2 = useFullScreenHandle();
  const reportChange = useCallback((state, handle) => {
    if (handle === screen1) {
      console.log('Screen 1 went to', state, handle);
    }
    if (handle === screen2) {
      console.log('Screen 2 went to', state, handle);
    }
  }, [screen1, screen2]);
  const goToNextPage = () => {
    // Lógica para ir a la siguiente página
  };

  const goToPreviousPage = () => {
    // Lógica para ir a la página anterior
  };

  const exitPresentation = () => {
    // handle.exit(); // Sale del modo pantalla completa
  };
  
  return (
    <div>
        <button onClick={screen1.enter}>
        First
      </button>

      <button onClick={screen2.enter}>
        Second
      </button>

    <FullScreen handle={screen1} onChange={reportChange}>
    <div className="top-menu">
          {/* <button onClick={goToPreviousPage}>Back</button>
          <button onClick={exitPresentation}>Salir</button>
          <button onClick={goToNextPage}>Next</button> */}
             <button onClick={screen2.enter}>
            Switch
          </button>
          <button onClick={screen1.exit}>
            Exit
          </button>
      </div>
  </FullScreen>

  <FullScreen handle={screen2} onChange={reportChange}>
    <div className="presentation-container">
      <div className="top-menu">
          <button onClick={goToPreviousPage}>Back</button>
          <button onClick={exitPresentation}>Salir</button>
          <button onClick={goToNextPage}>Next</button>
      </div>

      <Page/> 

    </div>
    </FullScreen>
    </div>
  );
}

export default ReadingView;
