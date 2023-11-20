import './DraggableBookCard.sass'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { useDrag } from 'react-dnd'

const DraggableBookCard = ({ book }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'books',
    item: {
      book: book,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`card draggable-book-card ${
        isDragging ? 'isDraggingStyle' : ''
      } `}
    >
      <div className='justify-card-content'>
        <FontAwesomeIcon size='2x' icon={faBook} />
        <div className='draggable-book-details'>
          <div>
            <span className='single-line-text'>{book.title}</span>
          </div>
          <div>
            <span className='author single-line-text'>{book.username}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraggableBookCard
