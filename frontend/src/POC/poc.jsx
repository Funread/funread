import './poc.css'
import React, { useState } from 'react'
import MyBooks from '../Components/MyBooks/MyBooks'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Library from '../Components/Library/Library'
import BookView from '../Components/Shared/BookView/BookView'
import SidebarBook from '../Components/Shared/SidebarBook/SidebarBook'
import CreateBook from '../Components/Shared/CreateBook/CreateBooks'

const POC = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')

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

  const handleSave = (newTitle, newContent) => {
    setEditedTitle(newTitle)
    setEditedContent(newContent)
  }
  return (
    <>
      <div className='container-fluid p-0 text-center '>
        <div className='row flex-nowrap ' style={{ height: 'auto' }}>
          <SidebarBook></SidebarBook>

          <div className={`sidenav ${showSidebar ? 'col-sm-8' : 'col-11'}`}>
            <div
              style={{ maxWidth: '1100px' }}
              className='mx-auto content_library'
            >
              <Form className='d-flex mt-1 pt-3'>
                <Form.Control
                  type='search'
                  placeholder='Search'
                  className='me-2'
                  aria-label='Search'
                />
                <Button variant='outline-success'>
                  <FontAwesomeIcon
                    className='fa-magnifying-glass'
                    icon={faSearch}
                  />
                </Button>
                <Button
                  variant='outline-success'
                  onClick={() => setModalShow(true)}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
              </Form>
              <CreateBook
                show={modalShow}
                onHide={() => setModalShow(false)}
                initialTitle={editedTitle}
                initialContent={editedContent}
                onSave={handleSave}
              />

              <h4>Recent Books</h4>
              <MyBooks toggleSidebar={toggleSidebar} />
              {selectedBook && (
                <div
                  className='sidebar-mobile'
                  style={{ background: '#79ABA8' }}
                >
                  <BookView
                    title={selectedBook?.title}
                    description={selectedBook?.description}
                    image={selectedBook?.image}
                    author={selectedBook?.author}
                  />
                </div>
              )}

              <Library toggleSidebar={toggleSidebar} />
            </div>
          </div>
          {selectedBook && (
            <div
              className='col-sm-3 p-0 sidebar-desktop'
              style={{ background: '#79ABA8' }}
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
    </>
  )
}

export default POC
