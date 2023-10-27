import './GameModes.css';
import Words from './Words';
import React, { useState } from 'react';
import GridGame from './GridGame';

const MIN_RESPONSES = 5;
const INTER_RESPONSES = 10;
const MAX_RESPONSES = 15;

function GameModes() {
  const [responses, setResponses] = useState(Array(MIN_RESPONSES).fill(''));
  const [palabras, setPalabras] = useState([]); // Nuevo estado para las palabras guardadas

  const addEasyResponses = () => {
    setResponses(Array(MIN_RESPONSES).fill(''));
  }

  const addInterResponses = () => {
    setResponses(Array(INTER_RESPONSES).fill(''));
  }

  const addAdvancedResponses = () => {
    setResponses(Array(MAX_RESPONSES).fill(''));
  }

  const handleResponseChange = (index, value) => {
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[index] = value;
      newResponses[index] = value.replace(/ /g, '');
      return newResponses;
    });
  }

  const saveResponses = () => {
    // Filtra las respuestas en blanco y elimina las líneas correspondientes
    const updatedResponses = responses.filter((response) => response.trim() !== '');
    setResponses(updatedResponses);

    // Almacena las respuestas limpias en el estado de palabras
    setPalabras(updatedResponses);
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
          <h3>Ingresa las palabras a buscar</h3>
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
          <GridGame palabras={palabras} />
        </div>
      </div>
    </div>
  );
}

export default GameModes;
