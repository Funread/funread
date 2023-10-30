import React from 'react'
import './Grids.sass'
import { useDrag } from 'react-dnd'

const widgetType = 'widgetType'

const Grids = ({ direction, numRows }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: widgetType,
    item: { type: 'Grids', direction: direction, numRows: numRows },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <section
      ref={drag}
      className={
        isDragging ? `dragStyle layout ${direction}` : `layout ${direction}`
      }
    >
      {[...Array(numRows).keys()].map((i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </section>
  )
}

export default Grids
