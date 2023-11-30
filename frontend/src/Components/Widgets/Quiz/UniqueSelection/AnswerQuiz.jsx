import './AnswerQuiz.css'
import { useState, useEffect } from 'react'
import { Switch, InputNumber } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose, faStar } from '@fortawesome/free-solid-svg-icons'

const AnswerQuiz = ({ value, onChange }) => {
  const [answer, setAnswer ] = useState(value.answer)
  const [points, setPoints] = useState(value.points)
  const [correct, setCorrect] = useState(value.correct)

  useEffect(() => {    
    onChange(answer, points, correct)
  }, [answer, points, correct])

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
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </div>
      <div className='custom-quiz-card-footer'>
        <div className='additional-options'>
          <InputNumber
            style={{ width: '65px' }}
            min={0}
            max={20}
            value={points}
            onChange={(value)=>setPoints(value)}
            prefix={<FontAwesomeIcon icon={faStar} />}
          />
          <Switch
            checkedChildren={<FontAwesomeIcon icon={faCheck} />}
            unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
            onChange={(checked) => setCorrect(checked)}
          />
        </div>
      </div>
    </div>
  )
}

export default AnswerQuiz
