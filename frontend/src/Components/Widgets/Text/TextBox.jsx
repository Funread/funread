import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

const widgetType = 'widgetType'

const Box = () => {
  const [text, setText] = useState('Lorem Ipsum')

  const [{ isDragging }, drag] = useDrag({
    type: widgetType,
    item: { type: 'Box' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const handleTextChange = (e) => {
    const newText = e.target.value
    setText(newText)
  }

  return (
    <div ref={drag}>
      <textarea value={text} onChange={handleTextChange} />
    </div>
  )
}

export default Box
