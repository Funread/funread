import React, { useState, useEffect } from 'react';

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
        fila.push(generarLetraAleatoria());
      }
      cuadricula.push(fila);
    }
    return cuadricula;
  }

  function insertarPalabras(cuadricula) {
    palabras.forEach((palabra) => {
      const direccion = Math.random() < 0.5 ? "horizontal" : "vertical";
      const filaInicial = Math.floor(Math.random() * filas);
      const columnaInicial = Math.floor(Math.random() * columnas);

      if (direccion === "horizontal") {
        for (let i = 0; i < palabra.length; i++) {
          if (columnaInicial + i < columnas) {
            cuadricula[filaInicial][columnaInicial + i] = palabra[i];
          }
        }
      } else {
        for (let i = 0; i < palabra.length; i++) {
          if (filaInicial + i < filas) {
            cuadricula[filaInicial + i][columnaInicial] = palabra[i];
          }
        }
      }
    });
  }

  const [cuadricula, setCuadricula] = useState(llenarCuadriculaAleatoria());

  useEffect(() => {
    const nuevaCuadricula = [...cuadricula];
    insertarPalabras(nuevaCuadricula);
    setCuadricula(nuevaCuadricula);
  }, []);

  return (
    <div>
      <h1>Sopa de Letras</h1>
      <table>
        <tbody>
          {cuadricula.map((fila, filaIndex) => (
            <tr key={filaIndex}>
              {fila.map((letra, columnaIndex) => (
                <td key={columnaIndex} className={palabras.includes(letra) ? 'resaltado' : ''}>
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
