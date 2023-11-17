import React, { useState } from 'react'
import './ClassesList.sass'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import CustomMessage from '../CustomMessage/CustomMessage'
import BookDropArea from '../BookDropArea/BookDropArea'

const activities = [
  {
    classesId: 1,
    name: 'Class 1',
  },
  {
    classesId: 2,
    name: 'Class 2',
  },
  {
    classesId: 3,
    name: 'Class 3',
  },
]

const ClassesList = () => {
  const [droppedBooks, setDroppedBooks] = useState([])

  const handleDrop = (activityId, book) => {
    setDroppedBooks((prevDroppedBooks) => {
      const updatedDroppedBooks = { ...prevDroppedBooks }

      if (!updatedDroppedBooks[activityId]) {
        updatedDroppedBooks[activityId] = []
      }

      // Verificar si el libro ya está en la lista antes de agregarlo
      const bookAlreadyDropped = updatedDroppedBooks[activityId].find(
        (droppedBook) => droppedBook.bookid === book.bookid
      )

      if (!bookAlreadyDropped) {
        updatedDroppedBooks[activityId].push(book)
      }

      return updatedDroppedBooks
    })
  }

  return (
    <div className='class-list'>
      {activities.length === 0 ? (
        <CustomMessage message={'No classes created'} />
      ) : (
        <>
          {_.map(activities, (activity) => (
            <div key={activity.classesId} className='mb-2 mt-2'>
              <div className='class-list-name'>
                <h5>{activity.name}</h5>
                <button className='ellipsis-icon'>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </div>

              <BookDropArea
                activityId={activity.classesId}
                droppedBooks={droppedBooks[activity.classesId] || []}
                onDrop={(book) => handleDrop(activity.classesId, book)}
              />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default ClassesList
