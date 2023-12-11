import './GameModes.css';
import Words from './Words';
import React, { useState } from 'react';
import GridGame from './GridGame';

const MIN_RESPONSES = 5;

function GameModes({ onWidgetChange }) {
  const [responses, setResponses] = useState(Array(MIN_RESPONSES).fill(''));
  const [palabras, setPalabras] = useState([]);
  const [filas, setFilas] = useState(10); 
  const [columnas, setColumnas] = useState(12); 
  const [mostrarComponente, setMostrarComponente] = useState(false);
  
  const handleResponseChange = (index, value) => {
    setFilas(10);
    setColumnas(12);
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[index] = value;
      newResponses[index] = value.replace(/ /, '');
      return newResponses;
    });
  }

  const saveResponses = () => {

    const updatedResponses = responses
      .map((response) => response.trim()) // Limpiar las palabras de espacios en blanco
      .filter((response) => response !== ''); // Filtrar respuestas vacías
  
    let maxResponses = 0;
  
    // Determinar el número máximo de respuestas según el nivel de dificultad
    if (responses.length === MIN_RESPONSES) {
      maxResponses = MIN_RESPONSES;
    }
  
    if (updatedResponses.length === maxResponses) {
      setResponses(updatedResponses);
      setPalabras(updatedResponses);
    } else {
      // Mostrar un mensaje de error o tomar alguna otra acción si no se ingresaron la cantidad requerida de palabras.
      alert(`Por favor, ingresa  ${maxResponses} palabras.`);
    }

    onWidgetChange({ type: 'Games', data: {data: updatedResponses}})

  }

  function ButtonNav({ title, onClick }) {
    return (
      <button onClick={onClick}>{title}</button>
    );
  }

  return (
    <div id='game'>
      <div className='row' id='rowGame'>
        
        <div className='col-9' id='modes'>
          <GridGame palabras={palabras} filas={filas} columnas={columnas} />
        </div>

        <div className='col-3 sectionWords'>
          
            <button className='personalize' onClick={() => setMostrarComponente(!mostrarComponente)}><img src='/imagenes/wsgame/personalizar.png'/></button>
            <div className={mostrarComponente ? "show-element" : "hide-element"}>
              <h6 className='titulo' >Enter the words to search</h6>
              <div>
                  {responses.map((response, index) => (
                    <Words
                      key={index}
                      value={response}
                      onChange={(value) => handleResponseChange(index, value)}
                    />
                  ))}
              </div>
              <div id='footerButton'>
                <ButtonNav title={'Save'} onClick={saveResponses} />
              </div>
            </div>
          </div>
        
      </div>
    </div>
  );
}

export default GameModes;
