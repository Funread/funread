import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BookView.sass'
import { getMediaUrl } from '../../Utils/mediaUrl'

const BookView = ({ book, onPreview }) => {
  const navigate = useNavigate()
  const bookImage = book.portrait
    ? getMediaUrl(book.portrait)
    : '/imagenes/no-image.png'

  const handleEditBook = () => {
    let bookID = book.id
    navigate(`/bookcreator/${bookID}`, {
      state: {
        data: book,
      },
    })
  }

  const handleReadBook = () => {
    let bookID = book.id
    navigate(`/readingview/${bookID}`, {
      state: {
        data: book.id,
      },
    })
  }

  return (
    <div className='book-view-container'>
      {/* Decorative floating stars */}
      <div className='decorative-star star-1'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className='decorative-star star-2'>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v18m-9-9h18" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </div>
      <div className='decorative-star star-3'>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className='decorative-star star-4'>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v18m-9-9h18" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </div>

      {/* Content Container */}
      <div className='book-content-wrapper'>
        {/* Book Cover */}
        <div className='book-cover'>
          <img src={bookImage} alt={book.title} />
          <div className='book-cover-sparkle'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v18m-9-9h18" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
        </div>

        {/* Book Title */}
        <h2 className='book-title'>{book.title}</h2>

        {/* Book Author - Mostrar author, createdby, o username si están disponibles */}
        {(book.author || book.createdby || book.username) && (
          <p className='book-author'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#eab308">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {book.author || book.username || `User ${book.createdby}`}
          </p>
        )}

        {/* Book Description */}
        {book.description && (
          <p className='book-description'>{book.description}</p>
        )}

        {/* Action Buttons */}
        <div className='book-buttons'>
          <button className='button-edit' onClick={handleEditBook}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
          <button className='button-read' onClick={handleReadBook}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            Read
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookView
