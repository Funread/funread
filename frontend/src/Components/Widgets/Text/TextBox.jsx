import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

const widgetType = 'widgetType'

const Box = (Screen) => {
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
console.log(Screen)


  return (
    <div ref={drag}>

      {Screen ? (
     <textarea value={text} onChange={handleTextChange} />
      
      ):

       (

        <p> {text} </p>
       
   
      )
      }
    </div>
  )
}
export default Box
