import './BookDropArea.sass'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDrop } from 'react-dnd'
import DraggableBookCard from '../DraggableBookCard/DraggableBookCard'
import CustomMessage from '../CustomMessage/CustomMessage'

const BookDropArea = ({ activityId, droppedBooks, onDrop, message }) => {
  const navigate = useNavigate()
  const [, drop] = useDrop(() => ({
    accept: 'books',
    drop: (item) => {
      const droppedBookIds = droppedBooks.map(
        (droppedBook) => droppedBook.bookid
      )

      // Verificar si el libro ya está en la lista antes de agregarlo
      if (!droppedBookIds.includes(item.book.bookid)) {
        onDrop(item.book)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const handleBookClick = (book) => {
    navigate(`/readingview/${book.bookid}`, {
      state: {
        data: book.bookid,
      },
    })
    
  }

  return (
    <div
      id={`dropArea-${activityId}`}
      ref={drop}
      className='card book-drop-area'
    >
      {droppedBooks.length === 0 ? (
        <CustomMessage message={message} />
      ) : (
        droppedBooks.map((book, index) => (
          <DraggableBookCard
            key={index}
            book={book}
            onClick={(book) => handleBookClick(book)}
          />
        ))
      )}
    </div>
  )
}

export default BookDropArea
