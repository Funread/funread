import './AnswerQuiz.css'
import React from 'react'

const AnswerQuiz = ({ value, onChange }) => {
  return (
    <div id='cardAnswer'>
      <button id='iconButton'>
        <img src='./agregar.png' alt='icon' />
      </button>
      <input
        type='text'
        placeholder='Answer'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default AnswerQuiz
