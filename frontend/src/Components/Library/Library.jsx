import './Library.css'
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

const Library = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const toggleSidebar = (book) => {
    if (!selectedBook) {
      setShowForm(false)
      setShowSidebar(true)
      setSelectedBook(book)
      return
    }

    if (selectedBook.id === book.id) {
      setShowSidebar(false)
      setSelectedBook(null)
      return
    }
    setSelectedBook(book)
  }

  const toggleFormSidebar = () => {
    if (showSidebar && selectedBook) {
      setSelectedBook(null)
      setShowForm(true)
      return
    }

    if (showSidebar && showForm) {
      setShowForm(false)
      setShowSidebar(false)
      return
    }

    setShowForm(true)
    setShowSidebar(true)
  }

  return (
    <div className='container-fluid custom-padding text-center library'>
      <div className='row flex-nowrap' style={{ height: 'auto' }}>
        <SidebarBook></SidebarBook>

        <div className={`sidenav ${showSidebar ? 'col-sm-9' : 'col-12'}`}>
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

            <h4 className='mt-3'>Recent Books</h4>
            <RecentBook toggleSidebar={toggleSidebar} />
            {selectedBook && (
              <div className='sidebar-mobile mt-3 my-2 shadow rounded'>
                <BookView
                  title={selectedBook?.title}
                  description={selectedBook?.description}
                  portrait={selectedBook?.portrait}
                  author={selectedBook?.author}
                />
              </div>
            )}

            <TapLibrary toggleSidebar={toggleSidebar} />
          </div>
        </div>
        {selectedBook && (
          <div className='col-sm-3 custom-padding sidebar-desktop shadow rounded'>
            <BookView
              title={selectedBook?.title}
              description={selectedBook?.description}
              portrait={selectedBook?.portrait}
              author={selectedBook?.author}
            />
          </div>
        )}
        {showForm && (
          <div className='col-sm-3 custom-padding sidebar-desktop shadow rounded'>
            <BookBuilder toggleSidebar={toggleSidebar} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Library
