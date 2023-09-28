import './Library.css'
import React, { useState } from 'react'
import MyBooks from '../MyBooks/MyBooks'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import TapLibrary from '../Shared/TapLibrary/TapLibrary'
import BookView from '../Shared/BookView/BookView'
import SidebarBook from '../Shared/SidebarBook/SidebarBook'

const Library = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  const toggleSidebar = (book) => {
    if (!selectedBook) {
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
              </Form>

              <h4 className='mt-3'>Recent Books</h4>
              <MyBooks toggleSidebar={toggleSidebar} />
              {selectedBook && (
                <div
                  className='sidebar-mobile mt-3 my-2 shadow rounded'
                >
                  <BookView
                    title={selectedBook?.title}
                    description={selectedBook?.description}
                    image={selectedBook?.image}
                    author={selectedBook?.author}
                  />
                </div>
              )}

              <TapLibrary toggleSidebar={toggleSidebar} />
            </div>
          </div>
          {selectedBook && (
            <div
              className='col-sm-3 custom-padding sidebar-desktop shadow rounded'
            >
              <BookView
                title={selectedBook?.title}
                description={selectedBook?.description}
                image={selectedBook?.image}
                author={selectedBook?.author}
              />
            </div>
           
          )}
        </div>
      </div>
   )
}

export default Library
