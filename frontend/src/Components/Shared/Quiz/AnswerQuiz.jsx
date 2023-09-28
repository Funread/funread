import './AnswerQuiz.css'
import React from 'react'
import Form from 'react-bootstrap/Form';


const AnswerQuiz = ({ value, onChange }) => {
  return (
    <div id='cardAnswer'>
      <button id='iconButton'>
        <img src='/imagenes/quiz/rubik.png' alt='icon' />
      </button>
      <input
        type='text'
        placeholder='Answer'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <input type="number" id='puntos' placeholder='pts' min="0" max="20"/>
      <Form.Check label="✔"/>
    </div>
  )
}

export default AnswerQuiz
