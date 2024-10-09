import './Library.sass'
import React, { useState } from 'react'
import RecentBook from '../RecentBook/RecentBook'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import TapLibrary from '../Shared/TapLibrary/TapLibrary'
import BookView from '../Shared/BookView/BookView'
import SidebarBook from '../Shared/SidebarBook/SidebarBook'
import BookBuilder from '../Shared/BookBuilder/BookBuilder'
import BookPreview from '../Shared/BookPreview/BookPreview'
import { ToastContainer, toast } from 'react-toastify'
import { bookSearch } from '../../api'

const Library = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [showForm, setShowForm] = useState(true)
  const [showBookBuilder, setShowBookBuilder] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewBookId, setPreviewBookId] = useState(null)
  
  const [title, setTitle] = useState('')

  const toggleSidebar = (book) => {
    setSelectedBook(book)
    setShowForm(false)
    setShowBookBuilder(false)
  }

  const toggleFormSidebar = () => {
    setSelectedBook(null)
    setShowForm(true)
  }

  const toggleBookBuilder = () => {
    setShowBookBuilder(true)
    setSelectedBook(null)
  }

  const handleUpdateBooks = (newBook) => {
    setBooks([...books, newBook])
  }

  const handleGetBookTitle = (event) => {
    setTitle(event.target.value)
  }

  const handlesubmit = async (event) => {
    event.preventDefault() 
    try {
       const response = await bookSearch(title)
       if (response && response.data) {
          toggleSidebar(response.data)
          setTitle('')
          toast.success(`Libro encontrado correctamente`)
        } else {
          toast.error(`Error al buscar el libro`)
        }
     } catch (error) {
       toast.error(`Error al buscar el libro`)
     }  
     handleGetBookTitle({ target: { value: "" } })
  }

  const handlePreview = (bookId) => {
    setPreviewBookId(bookId)
    setShowPreview(true)
  }

  const closePreview = () => {
    setShowPreview(false)
    setPreviewBookId(null)
  }

  return (
    <div className='container-fluid text-center library'>
      <div className='row' style={{ height: 'auto' }}>
        <div className='col-1 p-0'>
          <SidebarBook />
        </div>

        <div className='sidenav col-8'>
          <div style={{ maxWidth: '1100px' }} className='mx-auto content_library'>
            <Form className='d-flex mt-1 pt-3'>
              <Form.Control
                type='search'
                placeholder='Search for title'
                className='me-2 custom-input-search'
                aria-label='Search'
                value={title}
                onChange={handleGetBookTitle}
              />
              <Button
                className='button-search-library'
                onClick={toggleBookBuilder}
              >
                New Book
              </Button>
            </Form>

            <h4 className='custom-library-title mt-3'>Recent Books</h4>

            <RecentBook toggleSidebar={toggleSidebar} />

            <TapLibrary toggleSidebar={toggleSidebar} newBooks={books} />

          </div>
        </div>

        {/* Contenedor deslizante para BookView */}
        <div className={`book-view-container ${selectedBook ? 'open' : ''}`}>
          <div className='position_side'>
            {selectedBook && (
              <div className="book-view-content">
                <Button className='close-button' onClick={() => setSelectedBook(null)}>
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
                <BookView book={selectedBook} onPreview={handlePreview} /> {/* Pasamos la función handlePreview */}
              </div>
            )}
          </div>
        </div>
      
        {/* Contenedor deslizante para BookBuilder */}
        <div className={`book-builder-container ${showBookBuilder ? 'open' : ''}`}>
          <div className='position_side'>
            {showBookBuilder && (
              <>
                <button className="close-button" onClick={() => setShowBookBuilder(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <BookBuilder
                  toggleSidebar={toggleSidebar}
                  updateBook={handleUpdateBooks}
                />
              </>
            )}
          </div>
        </div>

        {/* Modal de Preview */}
        {showPreview && (
          <div className="preview-overlay">
            <div className="preview-content">
              <Button className='close-preview' onClick={closePreview}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <BookPreview bookid={previewBookId} onClose={closePreview} />
            </div>
          </div>
        )}

      </div>

      <ToastContainer position='top-right' />
    </div>
  )
}

export default Library
