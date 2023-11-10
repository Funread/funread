import './DraggableBookCard.sass'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { useDrag } from 'react-dnd'

const DraggableBookCard = ({ book }) => {
  const [, drag] = useDrag(() => ({
    type: 'books',
    item: {
      book: book,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  return (
    <div ref={drag} className='card draggable-book-card'>
      <div className='justify-card-content'>
        <FontAwesomeIcon size='2x' icon={faBook} />
        <div className='draggable-book-details'>
          <div>
            <span>{book.title}</span>
          </div>
          <div>
            <span className='author'>{book.createdby}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraggableBookCard
