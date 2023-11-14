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
import { newPage } from '../../api/pages'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const initialPage = {
  bookid: 0,
  type: 0,
  template: 0,
  elementorder: 0,
  gridDirection: null,
  gridNumRows: null,
  pageNumber: null,
}

const BookCreator = () => {
  const backend = isMobile ? TouchBackend : HTML5Backend
  const [slides, setSlides] = useState([{ id: 1, image: null }])
  const [pages, setPages] = useState([])
  const [savedPages, setSavedPages] = useState(new Set())
  const [widgetSeleted, setWidgetSelected] = useState([])
  const location = useLocation()
  const book = location.state.data
  initialPage.bookid = book.bookid

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

      const newPages = pages.filter((page) => page.pageNumber !== slideId)
      setPages(newPages)
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

  const addOrUpdatePage = (pageNumber, direction, numRows) => {
    setPages((prevPages) => {
      const updatedPages = prevPages.slice() // Se clona el estado anterior

      const existingPageIndex = updatedPages.findIndex(
        (page) => page.pageNumber === pageNumber
      )

      if (existingPageIndex !== -1) {
        const existingPage = updatedPages[existingPageIndex]
        existingPage.gridDirection = direction
        existingPage.gridNumRows = numRows
      } else {
        updatedPages.push({
          ...initialPage,
          pageNumber,
          gridDirection: direction,
          gridNumRows: numRows,
        })
      }

      return updatedPages
    })
  }

  const saveSlides = async (e) => {
    e.preventDefault()

    if (pages.length > 0) {
      for (const page of pages) {
        if (!savedPages.has(page.pageNumber)) {
          try {
            console.log(page)
            await newPage(
              page.bookid,
              page.type,
              page.template,
              page.elementorder,
              page.gridDirection,
              page.gridNumRows
            )
            toast.success(`Page ${page.pageNumber} added successfully`)
            savedPages.add(page.pageNumber)
          } catch (error) {
            toast.error(
              'Request Error: An error occurred while processing your request'
            )
          }
        }
      }
    }
  }

  const widgetChange = (newValue) => {
    setWidgetSelected((prevWidgets) => {
      // Filtra los widgets que no están en la misma posición que el nuevo widget
      const updatedWidgets = prevWidgets.filter(
        (widget) => widget.order !== newValue.order
      )

      // Agrega el nuevo widget al array actualizado
      return [...updatedWidgets, newValue]
    })
  }

  useEffect(() => {
    console.log(widgetSeleted)
  }, [widgetSeleted])

  return (
    <DndProvider backend={backend}>
      <div className='container-fluid bookCreator'>
        <div className='row flex-nowrap contentBookCreator'>
          <SidebarLeftTopTop />

          <div className='col p-0 mx-auto'>
            <NavbarButtons saveSlides={saveSlides} titleBook={book.title} />
            <div className='scroll'>
              <Carousel slides={slides} onAddSlide={addSlide} />
              <Slide
                slides={slides}
                onRemoveSlides={removeSlide}
                updateImage={updateImage}
                addOrUpdatePage={addOrUpdatePage}
                widgetChange={widgetChange}
              />
            </div>
          </div>
        </div>
        <ToastContainer position='top-right' />
      </div>
    </DndProvider>
  )
}

export default BookCreator
