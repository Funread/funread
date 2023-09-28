import './AnswerQuiz.css'
import React from 'react'

const AnswerQuiz = ({ value, onChange }) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <button className='icon-button'>
          <img src='./rubik.png' alt='icon' />
        </button>
        <div className='answer-input'>
          <input
            className='answer-input-format'
            type='text'
            placeholder='Answer'
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
      <div className='card-footer'>
        <div className='additional-options'>
          <input type='number' id='puntos' placeholder='pts' min='0' max='20' />
          <label>
            <input type='checkbox' />
            <span>Check</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default AnswerQuiz
