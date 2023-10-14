import './GameModes.css'
import ButtonNav from '../../../NavButton/ButtonNav';
import Words from './Words';
import React, { useState } from 'react'


const MIN_RESPONSES = 5
const INTER_RESPONSES = 10
const MAX_RESPONSES = 15

function GameModes(){

  
      const [responses, setResponses] = useState(Array().fill('')) // Inicia con 5 respuestas mínimo
    
      const addEasyResponses = () => {
          setResponses((Array(MIN_RESPONSES).fill('')))
      }

      const addInterResponses = () => {
        setResponses((Array(INTER_RESPONSES).fill('')))
      }
    
      const addAdvancedResponses = () => {
        setResponses((Array(MAX_RESPONSES).fill('')))
      }
 
    
      const handleResponseChange = (index, value) => {
        setResponses((prevResponses) => {
          const newResponses = [...prevResponses]
          newResponses[index] = value
          return newResponses
        })
      }
    
     
  


    return(
        <div id='game'>
            <div className='row'>
                <div className='col-4' id='modes'>
                    <h3>Choose the difficulty level</h3>
                    <div>
                        <div id='buttonsDifficulty'>
                          <button onClick={addEasyResponses}>               
                            Easy
                          </button>
                        </div>
                        <div id='buttonsDifficulty'>
                        <button onClick={addInterResponses}>              
                            Middle
                          </button>
                        </div>
                        <div id='buttonsDifficulty'>
                        <button onClick={addAdvancedResponses}>               
                            Advanced
                          </button>
                        </div>
                    </div>
                    <div id='footerButton' style={{marginTop:'14em'}}><ButtonNav title={'Next'}/></div>
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
                    <ButtonNav title={'Save'}/>
                </div>
                </div>
            </div>
        </div>
    );
}

export default GameModes;

