import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

const widgetType = 'widgetType'

const Box = ({ onWidgetChange, widgetId }) => {
  const [text, setText] = useState('')

  const [, drag] = useDrag({
    type: widgetType,
    item: { type: 'Box' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const handleTextChange = (e) => {
    const newText = e.target.value
    setText(newText)
    onWidgetChange({ widgetId: widgetId, type: 'Box', data: newText })
  }

  return (
    <div ref={drag}>
      <textarea
        placeholder='Lorem Ipsum'
        value={text}
        onChange={handleTextChange}
      />
    </div>
  )
}

export default Box
