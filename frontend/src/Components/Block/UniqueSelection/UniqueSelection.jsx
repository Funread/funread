import './UniqueSelection.css'
import React, { useState, useEffect } from 'react'
import AnswerQuiz from '../../Shared/Quiz/AnswerQuiz'

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
    <div className='container text-center mt-5'>
      <div className='row justify-content-center'>
        <div className='col'>
          <div>
            <input
              type='text'
              className='custom-input'
              placeholder='Start typing your question'
            />
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
          <button className='custom-button' onClick={toggleAddingResponses}>
            {isAddingResponses
              ? 'Add more answers'
              : 'Remove additional answers'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UniqueSelection
