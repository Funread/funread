import './GameModes.css';
import Words from './Words';
import React, { useState } from 'react';
import GridGame from './GridGame';

const MIN_RESPONSES = 5;
const INTER_RESPONSES = 10;
const MAX_RESPONSES = 15;

function GameModes() {
  const [responses, setResponses] = useState(Array(MIN_RESPONSES).fill(''));
  const [palabras, setPalabras] = useState([]);
  const [filas, setFilas] = useState(10); 
  const [columnas, setColumnas] = useState(14); 
  const addEasyResponses = () => {
    setResponses(Array(MIN_RESPONSES).fill(''));
    setFilas(10);
    setColumnas(12);
  }

  const addInterResponses = () => {
    setResponses(Array(INTER_RESPONSES).fill(''));
    setFilas(12); 
    setColumnas(17); 
  }

  const addAdvancedResponses = () => {
    setResponses(Array(MAX_RESPONSES).fill(''));
    setFilas(15); // Cambiar el número de filas según la dificultad
    setColumnas(24); // Cambiar el número de columnas según la dificultad
  }

  const handleResponseChange = (index, value) => {
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[index] = value;
      newResponses[index] = value.replace(/ /g, '');
      return newResponses;
    });
  }

  function esPalabraValida(palabra) {
    // Utiliza una expresión regular para verificar que la palabra contiene solo letras mayúsculas y minúsculas
    return /^[A-Za-z]+$/.test(palabra);
  }
  

  const saveResponses = () => {
    const updatedResponses = responses
      .map((response) => response.trim()) // Limpiar las palabras de espacios en blanco
      .filter((response) => response !== ''); // Filtrar respuestas vacías
  
    let maxResponses = 0;
  
    // Determinar el número máximo de respuestas según el nivel de dificultad
    if (responses.length === MIN_RESPONSES) {
      maxResponses = MIN_RESPONSES;
    } else if (responses.length === INTER_RESPONSES) {
      maxResponses = INTER_RESPONSES;
    } else if (responses.length === MAX_RESPONSES) {
      maxResponses = MAX_RESPONSES;
    }
  
    if (updatedResponses.length === maxResponses) {
      setResponses(updatedResponses);
      setPalabras(updatedResponses);
    } else {
      // Mostrar un mensaje de error o tomar alguna otra acción si no se ingresaron la cantidad requerida de palabras.
      alert(`Por favor, ingresa  ${maxResponses} palabras.`);
    }
  }

  function ButtonNav({ title, onClick }) {
    return (
      <button onClick={onClick}>{title}</button>
    );
  }

  return (
    <div id='game'>
      <div className='row'>
        <div className='col-4' id='modes'>
          <h3>Elige el nivel de dificultad</h3>
          <div>
            <div id='buttonsDifficulty'>
              <button onClick={addEasyResponses}>               
                Fácil
              </button>
            </div>
            <div id='buttonsDifficulty'>
              <button onClick={addInterResponses}>              
                Intermedio
              </button>
            </div>
            <div id='buttonsDifficulty'>
              <button onClick={addAdvancedResponses}>               
                Avanzado
              </button>
            </div>
          </div>
          <h3 className='titulo' >Ingresa las palabras a buscar</h3>
          <div className='responses-grid mx-auto mt-5'>
            {responses.map((response, index) => (
              <Words
                key={index}
                value={response}
                onChange={(value) => handleResponseChange(index, value)}
              />
            ))}
          </div>
          <div id='footerButton'>
            <ButtonNav title={'Guardar'} onClick={saveResponses} />
          </div>
        </div>
        <div className='col-7' id='modes'>
          <GridGame palabras={palabras} filas={filas} columnas={columnas} />
        </div>
      </div>
    </div>
  );
}

export default GameModes;
