import './SidebarImages.sass'
import React from 'react'
import { useDrag } from 'react-dnd'

const SidebarImages = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: item.widget.type.name,
    item: {
      type: item.widget.type.name,
      direction: item.widget.props.direction,
      numRows: item.widget.props.numRows,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <section ref={drag} className={isDragging ? 'drag-images-style' : ''}>
      <img src={item.image} width={110} alt='' />
    </section>
  )
}

export default SidebarImages
