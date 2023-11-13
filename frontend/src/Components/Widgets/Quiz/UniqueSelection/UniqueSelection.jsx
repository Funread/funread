import './UniqueSelection.css'
import React, { useState, useEffect } from 'react'
import AnswerQuiz from './AnswerQuiz'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { CreateQuiz } from '../../../../api/widgets/quiz'
import { useDrag } from 'react-dnd'

const MIN_RESPONSES = 2
const MAX_RESPONSES = 6

const widgetType = 'widgetType'

const UniqueSelection = ({ saveData, isFullScreen,header }) => {
  const [responses, setResponses] = useState(Array(MIN_RESPONSES).fill('')) // Inicia con dos respuestas mínimo
  const [isAddingResponses, setIsAddingResponses] = useState(true)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: widgetType, // identificador
    item: { type: 'UniqueSelection' },
    //La funcion collect es opcional
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), //Ayuda a saber si se está arrastrando o no
    }),
  }))

  const save = async () => {
    if (saveData) {
      if (saveData) {
        console.log('dentro')
        // const saveOptions = await CreateQuiz(saveData)
        // CreateQuiz('')
      }
    }
  }
  useEffect(() => {
    console.log('aaaa')
    save()
  }, [saveData])

  const addResponses = () => {
    if (responses.length < MAX_RESPONSES) {
      setResponses([...responses, '', ''])
    }
  }

  const removeResponses = () => {
    if (responses.length > MIN_RESPONSES) {
      const newResponses = responses.slice(0, -2)
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

  return (
    <div
      ref={drag}
      className='custom-unique-selection-background'
      style={{ border: isDragging ? '5px solid pink' : '0px' }}
    >
      <div className='container custom-unique-selection-container text-center m-0'>
        <div className='row'>
          <div className='col'>
            {/* <div id='cardQuestions'>
              <div className='row'>
                <input
                  type='text'
                  className='custom-input'
                  placeholder='Start typing your question'
                />
                <div className='custom-add-image'>
                  <div className='image-container'>
                    <div>
                      <img src='/imagenes/quiz/addImage.png' alt='addimage' />
                      <p>Find and insert media</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
  {header !== null && (
            <div className='responses-unique-selection-grid mx-auto mt-3'>
              {responses.map((response, index) => (
                <AnswerQuiz
                  key={index}
                  value={response}
                  onChange={(value) => handleResponseChange(index, value)}
                  isFullScreen={isFullScreen}
                />
              ))}
            </div>
 )}

            {isFullScreen ? null : (
              <button
                className={`custom-unique-selection-button ${isAddingResponses ? 'adding' : 'removing'
                  }`}
                onClick={toggleAddingResponses}
              >
                <div className='button-unique-selection-content'>
                  <div className='button-unique-selection-icon'>
                    {isAddingResponses ? (
                      <FontAwesomeIcon size='lg' icon={faPlus} />
                    ) : (
                      <FontAwesomeIcon size='lg' icon={faMinus} />
                    )}
                  </div>
                  <div className='button-unique-selection-text'>
                    {isAddingResponses
                      ? 'Add more answers'
                      : 'Remove additional answers'}
                  </div>
                </div>
              </button>

            )}

            
          </div>
        </div>
      </div>

    </div>

   
  )
}

export default UniqueSelection
