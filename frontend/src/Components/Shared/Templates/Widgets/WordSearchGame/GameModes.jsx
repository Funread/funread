import './GameModes.css'
import ButtonNav from '../ButtonNav/ButtonNav';
import Words from './Words';
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'


const MIN_RESPONSES = 5
const MAX_RESPONSES = 15

function GameModes(){

      const [responses, setResponses] = useState(Array(MIN_RESPONSES).fill('')) // Inicia con 5 respuestas mínimo
      const [isAddingResponses, setIsAddingResponses] = useState(true) // Estado inicial: agregar respuestas
    
      const addResponses = () => {
        if (responses.length < MAX_RESPONSES) {
          setResponses([...responses.concat(responses.slice(0, -2)), '', ''])
        }
      }
    
      const removeResponses = () => {
        if (responses.length > MIN_RESPONSES) {
          const newResponses = responses.slice(0, -5)
          setResponses(newResponses)
        }
      }
    
      const toggleAddingResponses = () => {
        if (isAddingResponses) {
          addResponses()
        } else {
          removeResponses()
        }
      }
    
      const handleResponseChange = (index, value) => {
        setResponses((prevResponses) => {
          const newResponses = [...prevResponses]
          newResponses[index] = value
          return newResponses
        })
      }
    
      useEffect(() => {
        if (responses.length === MIN_RESPONSES) {
          setIsAddingResponses(true)
        } else if (responses.length === MAX_RESPONSES) {
          setIsAddingResponses(false)
        }
      }, [responses])

  


    return(
        <div id='game'>
            <div className='row'>
                <div className='col-4' id='modes'>
                    <h3>Choose the difficulty level</h3>
                    <div>
                        <div id='buttonsDifficulty'><ButtonNav title={'Easy'} /></div>
                        <div id='buttonsDifficulty'><ButtonNav title={'Middle'} /></div>
                        <div id='buttonsDifficulty'><ButtonNav title={'Advanced'} /></div>
                    </div>
                    <div id='footerButton'><ButtonNav title={'Next'}/></div>
                </div>
                <div className='col-7' id='modes'>
                <h3>Enter the words to search</h3>
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
                <button
              className={`custom-button ${
                isAddingResponses ? 'adding' : 'removing'
              }`}
              onClick={toggleAddingResponses}
            >
              <div className='button-content'>
                <div className='button-icon'>
                  {isAddingResponses ? (
                    <FontAwesomeIcon size='lg' icon={faPlus} />
                  ) : (
                    <FontAwesomeIcon size='lg' icon={faMinus} />
                  )}
                </div>
                <div className='button-text'>
                  {isAddingResponses
                    ? 'Add more answers'
                    : 'Remove additional answers'}
                </div>
              </div>
            </button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default GameModes;

