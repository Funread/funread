import React, { useState, useEffect } from 'react';
import './GridGame.css';

function GridGame({ palabras, filas, columnas }) {
  function generarLetraAleatoria() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letras.charAt(Math.floor(Math.random() * letras.length));
  }

  function llenarCuadriculaAleatoria() {
    const cuadricula = [];
    for (let i = 0; i < filas; i++) {
      const fila = [];
      for (let j = 0; j < columnas; j++) {
        fila.push('');
      }
      cuadricula.push(fila);
    }
    return cuadricula;
  }
  function insertarPalabra(cuadricula, palabra) {
    let direccion, filaInicial, columnaInicial;
    // Agrega una probabilidad adicional para elegir si la palabra estará al revés
    const isReversed = Math.random() < 0.5;
    if (isReversed) {
      palabra = palabra.split('').reverse().join('');
    }
    
    do {
      const random = Math.random();
      if (random < 0.25) {
        direccion = "horizontal";
      } else if (random < 0.5) {
        direccion = "vertical";
      } else if (random < 0.75) {
        direccion = "diagonal";
      } else {
        direccion = "reversa"; // Nueva dirección para palabras al revés
      }
      filaInicial = Math.floor(Math.random() * filas);
      columnaInicial = Math.floor(Math.random() * columnas);
    } while (!esPosicionDisponible(cuadricula, palabra, direccion, filaInicial, columnaInicial));
  
    if (direccion === "horizontal" || direccion === "reversa") {
      for (let i = 0; i < palabra.length; i++) {
        cuadricula[filaInicial][columnaInicial + i] = palabra[i];
      }
    } else if (direccion === "vertical") {
      for (let i = 0; i < palabra.length; i++) {
        cuadricula[filaInicial + i][columnaInicial] = palabra[i];
      }
    } else if (direccion === "diagonal") {
      for (let i = 0; i < palabra.length; i++) {
        cuadricula[filaInicial + i][columnaInicial + i] = palabra[i];
      }
    }
  }
  

  function esPosicionDisponible(cuadricula, palabra, direccion, filaInicial, columnaInicial) {
    if (direccion === "horizontal") {
      if (columnaInicial + palabra.length > columnas) return false;
      for (let i = 0; i < palabra.length; i++) {
        if (cuadricula[filaInicial][columnaInicial + i] !== '') {
          return false;
        }
      }
    } else if (direccion === "vertical") {
      if (filaInicial + palabra.length > filas) return false;
      for (let i = 0; i < palabra.length; i++) {
        if (cuadricula[filaInicial + i][columnaInicial] !== '') {
          return false;
        }
      }
    } else if (direccion === "diagonal") {
      if (filaInicial + palabra.length > filas || columnaInicial + palabra.length > columnas) return false;
      for (let i = 0; i < palabra.length; i++) {
        if (cuadricula[filaInicial + i][columnaInicial + i] !== '') {
          return false;
        }
      }
    }
    return true;
  }

  const [cuadricula, setCuadricula] = useState(llenarCuadriculaAleatoria());

  useEffect(() => {
    const nuevaCuadricula = llenarCuadriculaAleatoria();
    const palabrasRestantes = [...palabras];

    while (palabrasRestantes.length > 0) {
      const palabra = palabrasRestantes.pop();
      insertarPalabra(nuevaCuadricula, palabra);
    }

    // Rellenar los cuadros vacíos con letras aleatorias
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        if (nuevaCuadricula[i][j] === '') {
          nuevaCuadricula[i][j] = generarLetraAleatoria();
        }
      }
    }

    setCuadricula(nuevaCuadricula);
  }, [palabras, filas, columnas]);

  return (
    <div>
      <h1>Word Search Game</h1>
      <table>
        <tbody>
          {cuadricula.map((fila, filaIndex) => (
            <tr key={filaIndex}>
              {fila.map((letra, columnaIndex) => (
                <td key={columnaIndex}>
                  {letra}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridGame;



