import './Library.sass'
import React, { useState } from 'react'
import RecentBook from '../RecentBook/RecentBook'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import TapLibrary from '../Shared/TapLibrary/TapLibrary'
import BookView from '../Shared/BookView/BookView'
import SidebarBook from '../Shared/SidebarBook/SidebarBook'
import BookBuilder from '../Shared/BookBuilder/BookBuilder'
import { ToastContainer } from 'react-toastify'

const Library = () => {
  const [selectedBook, setSelectedBook] = useState(null)
  const [showForm, setShowForm] = useState(true)

  const toggleSidebar = (book) => {
    if (!selectedBook) {
      setShowForm(false)
      setSelectedBook(book)
      return
    }

    if (selectedBook.id === book.id) {
      setSelectedBook(null)
      setShowForm(true)
      return
    }
    setSelectedBook(book)
  }

  const toggleFormSidebar = () => {
    if (selectedBook) {
      setSelectedBook(null)
      setShowForm(true)
      return
    }

    setShowForm(true)
  }

  return (
    <div className='container-fluid text-center library'>
      <div className='row' style={{ height: 'auto' }}>
        <div className='col-1 p-0'>
          <SidebarBook></SidebarBook>
        </div>

        <div className='sidenav col-8'>
          <div
            style={{ maxWidth: '1100px' }}
            className='mx-auto content_library'
          >
            <Form className='d-flex mt-1 pt-3'>
              <Form.Control
                type='search'
                placeholder='Search'
                className='me-2 custom-input-search '
                aria-label='Search'
              />
              <Button className='button-search-library'>
                <FontAwesomeIcon
                  className='fa-magnifying-glass'
                  icon={faSearch}
                />
              </Button>
              <Button
                className='button-search-library'
                onClick={toggleFormSidebar}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
            </Form>

            <h4 className='custom-library-title mt-3'>Recent Books</h4>

            <RecentBook toggleSidebar={toggleSidebar} />

            <TapLibrary toggleSidebar={toggleSidebar} />
          </div>
        </div>
        <div className='col-3 shadow rounded mobile-below-tap-library'>
          {selectedBook && (
            <BookView
              title={selectedBook?.title}
              description={selectedBook?.description}
              portrait={selectedBook?.portrait}
              author={selectedBook?.author}
            />
          )}

          {showForm && <BookBuilder toggleSidebar={toggleSidebar} />}
        </div>
      </div>
      <ToastContainer position='top-right' />
    </div>
  )
}

export default Library
