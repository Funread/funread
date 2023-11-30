import React, { useState } from 'react'

const Box = ({ onWidgetChange }) => {
  const [text, setText] = useState('')

  // const [, drag] = useDrag({
  //   type: widgetType,
  //   item: { type: 'Box' },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // })

  const handleTextChange = (e) => {
    const newText = e.target.value
    setText(newText)
    onWidgetChange({ type: 'Box', data: {data: newText }})
  }

  return (
    <div>
      <textarea
        placeholder='Lorem Ipsum'
        value={text}
        onChange={handleTextChange}
      />
    </div>
  )
}

export default Box
