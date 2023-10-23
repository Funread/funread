import React, { useState } from 'react'
import './BookCreator.sass'
import NavbarButtons from '../Shared/NavbarButtons/NavbarButtons'
import SidebarLeftTopTop from '../Shared/SidebarLeftTopTop/SidebarLeftTopTop'
import Carousel from '../Shared/NavBarCarrousel/NavBarCarrousel'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { isMobile } from 'react-device-detect'
import Slide from '../Shared/Slides/Slide'

const BookCreator = () => {
  const backend = isMobile ? TouchBackend : HTML5Backend
  const [slides, setSlides] = useState([1])

  const addSlide = () => {
    const newSlide = Math.max(...slides) + 1
    setSlides([...slides, newSlide])
  }

  const removeSlide = () => {
    if (slides.length > 1) {
      const newSlides = slides.slice(0, -1)
      setSlides(newSlides)
    }
  }

  return (
    <DndProvider backend={backend}>
      <div className='container-fluid bookCreator'>
        <div className='row flex-nowrap contentBookCreator'>
          <SidebarLeftTopTop />

       
          <div className='col-ms-10 p-0 mx-auto'>
            <NavbarButtons />
            <div className='scroll'>
            <Carousel slides={slides} onAddSlide={addSlide} />


            <Slide slides={slides} onRemoveSlides={removeSlide} />
          </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default BookCreator
