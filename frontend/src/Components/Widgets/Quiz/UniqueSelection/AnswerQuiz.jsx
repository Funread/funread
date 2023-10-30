import './AnswerQuiz.css'
import React from 'react'
import { Switch, InputNumber } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose, faStar } from '@fortawesome/free-solid-svg-icons'

const AnswerQuiz = ({ value, onChange }) => {
  return (
    <div className='custom-answer-quiz-card'>
      <div className='custom-quiz-card-header'>
        <button className='icon-button'>
          <img src='/imagenes/quiz/rubik.png' alt='icon' />
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
      <div className='custom-quiz-card-footer'>
        <div className='additional-options'>
          <InputNumber
            style={{ width: '65px' }}
            min={0}
            max={20}
            prefix={<FontAwesomeIcon icon={faStar} />}
          />
          <Switch
            checkedChildren={<FontAwesomeIcon icon={faCheck} />}
            unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
          />
        </div>
      </div>
    </div>
  )
}

export default AnswerQuiz
