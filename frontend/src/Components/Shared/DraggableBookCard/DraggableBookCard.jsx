import './DraggableBookCard.sass'
import React from 'react'
import { useDrag } from 'react-dnd'
import { BASE_URL } from '../../../settings';

const getImage = BASE_URL

const DraggableBookCard = ({ book, onClick }) => {
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

  const handleClick = () => {
    if (onClick) {
      onClick(book)
    }
  }

  return (
    <div
      ref={drag}
      onClick={handleClick}
      className={`card draggable-book-card ${
        isDragging ? 'isDraggingStyle' : ''
      } `}
    >
      <div className='justify-card-content'>
        <img src={bookImage} width={30} height={30} alt='Book Cover' />
        <div className='draggable-book-details single-line-text'>
          <div>
            <span>{book.title}</span>
          </div>
          <div>
            <span className='author'>{book.username}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraggableBookCard
