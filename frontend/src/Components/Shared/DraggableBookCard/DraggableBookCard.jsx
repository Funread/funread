import './DraggableBookCard.sass'
import React from 'react'
import { useDrag } from 'react-dnd'

const getImage = 'http://localhost:8000'

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

  const bookImage = book.portrait
    ? `${getImage}${book.portrait}`
    : './imagenes/no-image.png'

  return (
    <div
      ref={drag}
      className={`card draggable-book-card ${
        isDragging ? 'isDraggingStyle' : ''
      } `}
    >
      <div className='justify-card-content'>
        <img src={bookImage} width={30} height={30} alt='Book Cover' />
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
