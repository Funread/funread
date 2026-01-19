import './Classes.sass'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
import { listed, usersList } from '../../../api'

const Classes = ({ groupId, groudName, toggleGroupClasses, newActivities }) => {
  const user = useSelector((state) => state.user)
  const backend = isMobile ? TouchBackend : HTML5Backend
  const [books, setBooks] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const bookList = await listed()
        const allUsers = await usersList()

        // Se filtran libros públicos o los publicados por ese profesor
        const filteredBooks = bookList.data
          .filter(
            (book) => book.sharedbook === 1 || book.createdby === user.userId
          )
          .map((book) => {
            const createdByUser = allUsers.data.find(
              (user) => user.userid === book.createdby
            )
            const username = createdByUser
              ? `${createdByUser.name} ${createdByUser.lastname}`
              : ''

            // Devolver un nuevo objeto con el username
            return { ...book, username }
          })
        setBooks(filteredBooks)
      } catch (error) {
        
      }
    }

    fetchData()
  }, [user.userId])

  return (
    <DndProvider backend={backend}>
      <div className='container-fluid custom-classes'>
        <div className='classes-position'>
          <div className='card custom-classes-card'>
            <h5>Book list</h5>

            <hr className='mt-0' />
            {books && books.length === 0 ? (
              <CustomMessage message={'There are no books entered'} />
            ) : (
              _.map(books, (book) => (
                <DraggableBookCard key={book.bookid} book={book} />
              ))
            )}
          </div>
          <div className='card custom-classes-card'>
            <div className='custom-justify-content '>
              <h5>Classes List {groudName}</h5>
              <button onClick={toggleGroupClasses} data-toggle='tooltip'
                data-placement='bottom'
                title='Create Class'>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <hr className='mt-0' />
            <ClassesList
              groupId={groupId}
              newActivities={newActivities}
              message={'Drop a book here'}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default Classes
