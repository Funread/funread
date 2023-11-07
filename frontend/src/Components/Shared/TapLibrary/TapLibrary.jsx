import React, { useState, useEffect } from 'react'
import BookCard from '../BookCard/BookCard'
import './TapLibrary.sass'
import { Tabs, Tab } from 'react-bootstrap'
import { listed_PrivateBooks, listed_PublishedBooks } from '../../../api/books'
import Message from '../CustomMessage/CustomMessage'

function TapLibrary({ toggleSidebar, newBooks }) {
  const [key, setKey] = useState('mylibrary')
  const [publishedBooks, setPublishedBooks] = useState([])
  const [privateBooks, setPrivateBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [publishedResponse, privateResponse] = await Promise.all([
          listed_PublishedBooks(),
          listed_PrivateBooks(),
        ])

        setPublishedBooks(publishedResponse.data)
        setPrivateBooks(privateResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [newBooks])

  const renderBooks = (books) => {
    if (isLoading) {
      return <Message message={'Loading...'} />
    }

    if (books.length === 0) {
      return <Message message={'No books have been entered'} />
    }

    return books.map(
      ({ id, portrait, title, category, author, description }, index) => (
        <div key={index} className='section_item_Tap'>
          <BookCard
            key={index}
            id={id}
            portrait={portrait}
            title={title}
            category={category}
            author={author}
            description={description}
            color={'#D0F4DE'}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )
    )
  }

  return (
    <>
      <Tabs
        className='mt-2'
        id='controlled-tab'
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey='mylibrary' title='My library' className='tab'>
          <div className='section_library_Tap shadow p-3 bg-body rounded'>
            {renderBooks(privateBooks)}
          </div>
        </Tab>
        <Tab eventKey='publiclibrary' title='Public Library' className='tab'>
          <div className='section_library_Tap shadow p-3 mb-5 bg-body rounded '>
            {renderBooks(publishedBooks)}
          </div>
        </Tab>
      </Tabs>
      <br />
    </>
  )
}

export default TapLibrary
