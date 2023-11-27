import './BookDropArea.sass'
import React from 'react'
import { useDrop } from 'react-dnd'
import DraggableBookCard from '../DraggableBookCard/DraggableBookCard'
import CustomMessage from '../CustomMessage/CustomMessage'

const BookDropArea = ({ activityId, droppedBooks, onDrop }) => {
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

  return (
    <div
      id={`dropArea-${activityId}`}
      ref={drop}
      className='card book-drop-area'
    >
      {droppedBooks.length === 0 ? (
        <CustomMessage message={'Drop a book here'} />
      ) : (
        droppedBooks.map((book, index) => (
          <DraggableBookCard key={index} book={book} />
        ))
      )}
    </div>
  )
}

export default BookDropArea
