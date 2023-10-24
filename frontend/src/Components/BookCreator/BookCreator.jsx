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
  const [capturedImages, setCapturedImages] = useState({})

  // Función para agregar una diapositiva
  const addSlide = () => {
    const newSlideId = Math.max(...slides.map((slide) => slide.id)) + 1
    setSlides([...slides, { id: newSlideId, image: null }])
  }

  // Función para quitar la última diapositiva
  const removeSlide = (slideId) => {
    if (slides.length > 1) {
      const newSlides = slides.filter((slide) => slide.id !== slideId)
      setSlides(newSlides)
    }
  }

  const handleImageCaptured = (pageNumber, image) => {
    // Copia el estado actual de las diapositivas y actualiza la diapositiva con la imagen capturada.
    const updatedSlides = slides.map((slide) => {
      if (slide.id === pageNumber) {
        return { id: pageNumber, image: image }
      }
      return slide
    })

    // Actualiza el estado de las diapositivas con la nueva información.
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
              <Carousel
                slides={slides}
                onAddSlide={addSlide}
                capturedImages={capturedImages}
              />
              <Slide
                slides={slides}
                onRemoveSlides={removeSlide}
                onImageCaptured={handleImageCaptured}
              />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default BookCreator
