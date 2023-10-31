import React, { useState, useEffect } from 'react'
import BookCard from '../BookCard/BookCard'
import './TapLibrary.sass'
import { Tabs, Tab } from 'react-bootstrap'
import {
  listed,listed_PublishedBooks
} from '../../../api/books'




function TapLibrary({ toggleSidebar }) {
const [key, setKey] = useState('mylibrary')
const [publishedBooks, setPublishedBooks] = useState([])
useEffect(() => {
  async function fetchData() {
    try { 
      
      const response = await listed_PublishedBooks()
      setPublishedBooks(response.data)

    } catch (error) {
      console.log('error', error)
    }
  }

  fetchData()
}, [])

return (
  <>
    <Tabs
      className='mt-2'
      id='controlled-tab'
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey='mylibrary' title='My library' className='tab'>

        <div className='section_library_Tap p-3 bg-body rounded'>
            {publishedBooks.map(
              ({
                id,
                portrait,
                title,
                category,
                author,
                description,
                color,
              }) => (

                <div key={id} className='section_item_Tap'>

                  <BookCard
                    id={id}
                    portrait={portrait}
                    title={title}
                    category={category}
                    author={author}
                    description={description}
                    color={color}
                    toggleSidebar={toggleSidebar}
                  />
                </div>
              )
            )}
          </div>
        </Tab>
        <Tab eventKey='publiclibrary' title='Public Library' className='tab'>

          <div className='section_library_Tap shadow p-3 mb-5 bg-body rounded '>

            {publishedBooks.map(
              ({
                id,
                portrait,
                title,
                category,
                author,
                description,
                color,
              }) => (

                <div key={id} className='section_item_Tap'>

                  <BookCard
                    id={id}
                    portrait={portrait}
                    title={title}
                    category={category}
                    author={author}
                    color={color}
                    description={description}
                    toggleSidebar={toggleSidebar}
                  />
                </div>
              )
            )}
          </div>
        </Tab>
      </Tabs>
      <br/>
    </>
  )
}


export default TapLibrary
