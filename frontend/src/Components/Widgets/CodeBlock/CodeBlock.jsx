import './CodeBlock.sass'
import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const CodeBlock = ({ onWidgetChange, widgetId }) => {
  const [codeHTML, setCodeHTML] = useState('')

  // const [, drag] = useDrag({
  //   type: widgetType,
  //   item: { type: 'CodeBlock' },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // })

  const handleCodeChange = (e) => {
    const newCode = e.target.value
    setCodeHTML(newCode)
    onWidgetChange({ widgetId: widgetId, type: 'CodeBlock', data: {data: newCode } })
  }

  return (
    <div>
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default CodeBlock
