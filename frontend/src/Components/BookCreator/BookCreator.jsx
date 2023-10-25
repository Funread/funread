import './BookCreator.sass'
import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { isMobile } from 'react-device-detect'
import NavbarButtons from '../Shared/NavbarButtons/NavbarButtons'
import SidebarLeftTopTop from '../Shared/SidebarLeftTopTop/SidebarLeftTopTop'
import Carousel from '../Shared/NavBarCarrousel/NavBarCarrousel'
import Slide from '../Shared/Slides/Slide'

const BookCreator = () => {
  const backend = isMobile ? TouchBackend : HTML5Backend
  const [slides, setSlides] = useState([{ id: 1, image: null }])

  // Agregar una diapositiva
  const addSlide = () => {
    const newSlideId = Math.max(...slides.map((slide) => slide.id)) + 1
    setSlides([...slides, { id: newSlideId, image: null }])
  }

  // Quitar la diapositiva
  const removeSlide = (slideId) => {
    if (slides.length > 1) {
      const newSlides = slides.filter((slide) => slide.id !== slideId)
      setSlides(newSlides)
    }
  }

  // Actualiza la imagen de las diapositivas
  const updateImage = (pageNumber, image) => {
    const updatedSlides = slides.map((slide) => {
      if (slide.id === pageNumber) {
        return { ...slide, image }
      }
      return slide
    })

    setSlides(updatedSlides)
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
              <Slide
                slides={slides}
                onRemoveSlides={removeSlide}
                updateImage={updateImage}
              />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default BookCreator
