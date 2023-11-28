import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './ReadingView.sass';
import Page from './Page'; // Importa tus componentes de página

function ReadingView() {
  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="hoja">
          {/* Contenido de la hoja */}
          <h1>Título de la Hoja</h1>
          <p>Contenido de la hoja...</p>
          <img src="/imagenes/Libro1/1.png" alt="Mi Imagen" className="imagen" />
 
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
