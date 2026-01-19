import React, { useState, useEffect } from 'react'
import './ClassesList.sass'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import CustomMessage from '../CustomMessage/CustomMessage'
import BookDropArea from '../BookDropArea/BookDropArea'
import {
  listed,
  listedBooksPerClassesById,
  listedClassesId,
  newBookPerClass,
  usersList,
} from '../../../api'

const ClassesList = ({ groupId, newActivities, message }) => {
  const [droppedBooks, setDroppedBooks] = useState([])
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classResponse, booksResponse, usersResponse] = await Promise.all(
          [listedClassesId(groupId), listed(), usersList()]
        )

        const loadedBooks = {}

        await Promise.all(
          classResponse.data.map(async (activity) => {
            const booksPerClass = await listedBooksPerClassesById(
              activity.classesid
            )

            //Sería mejor buscar por id del libro (Método no implementado en backend)
            const bookDetails = await Promise.all(
              booksPerClass.data.map(async (bookPerClass) => {
                const book = booksResponse.data.find(
                  (book) => book.bookid === bookPerClass.booksid
                )

                const createdByUser = usersResponse.data.find(
                  (user) => user.userid === book.createdby
                )

                return {
                  ...book,
                  username: createdByUser
                    ? `${createdByUser.name} ${createdByUser.lastname}`
                    : '',
                }
              })
            )

            loadedBooks[activity.classesid] = bookDetails
          })
        )

        setDroppedBooks(loadedBooks)
        setActivities(classResponse.data)
      } catch (error) {
        
      }
    }

    fetchData()
  }, [groupId, newActivities])

  const handleDrop = async (activityId, book) => {
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
        // Obtener el próximo orden
        const nextOrder =
          updatedDroppedBooks[activityId].length > 0
            ? Math.max(
                ...updatedDroppedBooks[activityId].map(
                  (droppedBook) => droppedBook.order
                )
              ) + 1
            : 1

        // Agregar el libro con la información del orden
        updatedDroppedBooks[activityId].push({ ...book, order: nextOrder })
      }

      return updatedDroppedBooks
    })
    const order =
      droppedBooks[activityId][droppedBooks[activityId].length - 1]?.order

    try {
      await newBookPerClass(book.bookid, activityId, order, 1)
    } catch (error) {
      
    }
  }

  return (
    <div className='class-list'>
      {activities.length === 0 ? (
        <CustomMessage message={'No classes created'} />
      ) : (
        <>
          {_.map(activities, (activity) => (
            <div key={activity.classesid} className='mb-2 mt-2'>
              <div className='class-list-name'>
                <h5>{activity.name}</h5>
                <button className='ellipsis-icon'>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </div>

              <BookDropArea
                activityId={activity.classesid}
                droppedBooks={droppedBooks[activity.classesid] || []}
                onDrop={(book) => handleDrop(activity.classesid, book)}
                message={message}
              />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default ClassesList
