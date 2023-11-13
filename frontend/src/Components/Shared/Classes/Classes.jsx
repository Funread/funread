import './Classes.sass'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { isMobile } from 'react-device-detect'
import _ from 'lodash'
import ClassesList from '../ClassesList/ClassesList'
import DraggableBookCard from '../DraggableBookCard/DraggableBookCard'
import CustomMessage from '../CustomMessage/CustomMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const books = [
  {
    bookid: 1,
    title: 'Book 1',
    portrait: 'media',
    createdby: 'Author name 1',
  },
  {
    bookid: 2,
    title: 'Book 2',
    portrait: 'media',
    createdby: 'Author name 2',
  },
  {
    bookid: 3,
    title: 'Book 3',
    portrait: 'media',
    createdby: 'Author name 3',
  },
  {
    bookid: 4,
    title: 'Book 4',
    portrait: 'media',
    createdby: 'Author name 4',
  },
]
const Classes = ({ toggleGroupClasses }) => {
  const backend = isMobile ? TouchBackend : HTML5Backend

  return (
    <DndProvider backend={backend}>
      <div className='container-fluid custom-classes'>
        <div className='classes-position'>
          <div className='card custom-classes-card'>
            <h5>Book list</h5>

            <hr className='mt-0' />
            {books.length === 0 ? (
              <CustomMessage message={'There are no books entered'} />
            ) : (
              _.map(books, (book) => (
                <DraggableBookCard key={book.bookid} book={book} />
              ))
            )}
          </div>
          <div className='card custom-classes-card'>
            <div className='custom-justify-content'>
              <h5>Classes list</h5>
              <button onClick={toggleGroupClasses}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <hr className='mt-0' />
            <ClassesList />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default Classes
