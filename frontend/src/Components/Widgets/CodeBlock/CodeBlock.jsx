import './CodeBlock.sass'
import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDrag } from 'react-dnd'

const widgetType = 'widgetType'

const CodeBlock = ({ onWidgetChange, widgetId }) => {
  const [codeHTML, setCodeHTML] = useState('')

  const [, drag] = useDrag({
    type: widgetType,
    item: { type: 'CodeBlock' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const handleCodeChange = (e) => {
    const newCode = e.target.value
    setCodeHTML(newCode)
    onWidgetChange({ widgetId: widgetId, type: 'CodeBlock', data: newCode })
  }

  return (
    <div ref={drag}>
      <Container>
        <Row>
          <Col>
            <div className='d-flex flex-column'>
              <label>Code HTML</label>
              <textarea
                value={codeHTML}
                placeholder='<p>Hello World!</p>'
                onChange={handleCodeChange}
              />
              <button className='custom-save-button-HTML' type='submit'>
                Save
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default CodeBlock
