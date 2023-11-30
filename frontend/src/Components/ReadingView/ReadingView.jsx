import React, { useEffect, useState } from 'react'
import './ReadingView.sass'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Page from './Page'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { fullBook } from '../../api/books'

function ReadingView() {
  const handle = useFullScreenHandle()
  const location = useLocation()
  const bookid = location.state.data
  const [contentBook, setContentBook] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const fullBookResponse = await fullBook(bookid)
        setContentBook(fullBookResponse.data)
        console.log('fullbook', fullBookResponse)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [bookid])

  const goToNextPage = () => {
    // Lógica para ir a la siguiente página
  }

  const goToPreviousPage = () => {
    // Lógica para ir a la página anterior
  }

  const exitPresentation = () => {
    handle.exit() // Sale del modo pantalla completa
  }
  return (
    <FullScreen handle={handle}>
      <div className='presentation-container'>
        <div className='top-menu'>
          <button onClick={goToPreviousPage}>Back</button>
          <button onClick={exitPresentation}>Salir</button>
          <button onClick={goToNextPage}>Next</button>
        </div>

        <Page />
      </div>
    </FullScreen>
  )
}

export default ReadingView
