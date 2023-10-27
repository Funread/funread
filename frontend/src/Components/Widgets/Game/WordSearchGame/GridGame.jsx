import React, { useState, useEffect } from 'react';
import './GridGame.css';

function SopaDeLetras({ palabras }) {
  const filas = 12;
  const columnas = 16;

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
    do {
      direccion = Math.random() < 0.5 ? "horizontal" : "vertical";
      filaInicial = Math.floor(Math.random() * filas);
      columnaInicial = Math.floor(Math.random() * columnas);
    } while (!esPosicionDisponible(cuadricula, palabra, direccion, filaInicial, columnaInicial));

    if (direccion === "horizontal") {
      for (let i = 0; i < palabra.length; i++) {
        cuadricula[filaInicial][columnaInicial + i] = palabra[i];
      }
    } else {
      for (let i = 0; i < palabra.length; i++) {
        cuadricula[filaInicial + i][columnaInicial] = palabra[i];
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
    } else {
      if (filaInicial + palabra.length > filas) return false;
      for (let i = 0; i < palabra.length; i++) {
        if (cuadricula[filaInicial + i][columnaInicial] !== '') {
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
  }, [palabras]);

  return (
    <div>
      <h1>Sopa de Letras</h1>
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

export default SopaDeLetras;



