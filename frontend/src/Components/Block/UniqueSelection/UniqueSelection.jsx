import './UniqueSelection.css'
import React, { useState, useEffect } from 'react'
import AnswerQuiz from '../../Shared/Quiz/AnswerQuiz'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const MIN_RESPONSES = 2
const MAX_RESPONSES = 6

const UniqueSelection = () => {
  const [responses, setResponses] = useState(Array(MIN_RESPONSES).fill('')) // Inicia con dos respuestas mínimo
  const [isAddingResponses, setIsAddingResponses] = useState(true) // Estado inicial: agregar respuestas

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
    <div className='custom-quiz-background'>
      <div className='container custom-quiz-container text-center'>
        <div className='row'>
          <div className='col'>
            {/*<div>
              <input
                type='text'
                className='custom-input'
                placeholder='Start typing your question'
              />
            </div>

            <div className='d-flex justify-content-center align-items-center'>
              <div className='custom-add-image'>
                <div className='image-container'>
                  <div>
                    <FontAwesomeIcon size='3x' icon={faPlus} />
                    <p>Find and insert media</p>
                  </div>
                </div>
              </div>
  </div>*/}

            <div id='cardQuestions'>
              <div className='row'>
                  <input
                    type='text'
                    className='custom-input'
                    placeholder='Start typing your question'
                  />
                  <div className='custom-add-image'>
                    <div className='image-container'>
                      <div>
                        {/*<FontAwesomeIcon size='3x' icon={faPlus} />*/}
                        <img src='/imagenes/quiz/addImage.png' alt='image'  />
                        <p>Find and insert media</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            <div className='responses-grid mx-auto mt-5'>
              {responses.map((response, index) => (
                <AnswerQuiz
                  key={index}
                  value={response}
                  onChange={(value) => handleResponseChange(index, value)}
                />
              ))}
            </div>
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
  )
}

export default UniqueSelection
