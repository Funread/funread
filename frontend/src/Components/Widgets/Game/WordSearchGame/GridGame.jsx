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

  function esPosicionOcupada(cuadricula, direccion, filaInicial, columnaInicial, palabra) {
    for (let i = 0; i < palabra.length; i++) {
      if (direccion === "horizontal" && cuadricula[filaInicial][columnaInicial + i] !== '') {
        return true;
      } else if (direccion === "vertical" && cuadricula[filaInicial + i][columnaInicial] !== '') {
        return true;
      } else if (direccion === "diagonal" && cuadricula[filaInicial + i][columnaInicial + i] !== '') {
        return true;
      }
    }
    return false;
  }

  function insertarPalabra(cuadricula, palabra) {
    let direccion, filaInicial, columnaInicial;

    // Elegir una dirección al azar con igual probabilidad
    const random = Math.random();
    if (random < 0.33) {
      direccion = "horizontal";
    } else if (random < 0.66) {
      direccion = "vertical";
    } else {
      direccion = "diagonal";
    }

    // Definir isReversed para invertir la palabra si es necesario
    let isReversed = false;
    if (direccion !== "vertical" && Math.random() < 0.5) {
      palabra = palabra.split('').reverse().join('');
      isReversed = true;
    }

    // Calcular las coordenadas iniciales
    do {
      if (direccion === "horizontal") {
        filaInicial = Math.floor(Math.random() * filas);
        columnaInicial = Math.floor(Math.random() * (columnas - palabra.length + 1));
      } else if (direccion === "vertical") {
        filaInicial = Math.floor(Math.random() * (filas - palabra.length + 1));
        columnaInicial = Math.floor(Math.random() * columnas);
      } else {
        filaInicial = Math.floor(Math.random() * (filas - palabra.length + 1));
        columnaInicial = Math.floor(Math.random() * (columnas - palabra.length + 1));
      }
    } while (esPosicionOcupada(cuadricula, direccion, filaInicial, columnaInicial, palabra));

    // Insertar la palabra en la dirección especificada
    for (let i = 0; i < palabra.length; i++) {
      if (direccion === "horizontal") {
        cuadricula[filaInicial][columnaInicial + i] = isReversed ? palabra[palabra.length - 1 - i] : palabra[i];
      } else if (direccion === "vertical") {
        cuadricula[filaInicial + i][columnaInicial] = isReversed ? palabra[palabra.length - 1 - i] : palabra[i];
      } else {
        cuadricula[filaInicial + i][columnaInicial + i] = isReversed ? palabra[palabra.length - 1 - i] : palabra[i];
      }
    }
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
                 <td key={columnaIndex} className={esLetraDePalabra(letra) ? 'highlighted-word' : ''}>
                 {letra}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function esLetraDePalabra(letra) {
    for (const palabra of palabras) {
      if (palabra.includes(letra)) {
        return true;
      }
    }
    return false;
  }

}

export default GridGame;



