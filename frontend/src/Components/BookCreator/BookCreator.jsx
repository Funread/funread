import './BookCreator.sass'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { isMobile } from 'react-device-detect'
import { ToastContainer, toast } from 'react-toastify'
import NavbarButtons from '../Shared/NavbarButtons/NavbarButtons'
import SidebarLeftTopTop from '../Shared/SidebarLeftTopTop/SidebarLeftTopTop'
import Carousel from '../Shared/NavBarCarrousel/NavBarCarrousel'
import Slide from '../Shared/Slides/Slide'
import { newPage } from '../../api/pages'
import { newWidgetItem, listedWidgets } from '../../api/widget'

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
  const [slides, setSlides] = useState([{ id: 1, image: null, order: 1 }])
  const [pages, setPages] = useState([])
  const [widgets, setWidgets] = useState([])
  const [savedPages, setSavedPages] = useState(new Set())
  const [widgetSeleted, setWidgetSelected] = useState([])
  const location = useLocation()
  const book = location.state.data
  initialPage.bookid = book.id

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listedWidgets()
        setWidgets(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  // Agregar una diapositiva
  const addSlide = () => {
    setSlides((prevSlides) => {
      const lastSlide = prevSlides[prevSlides.length - 1]
      const newSlideId = lastSlide ? lastSlide.id + 1 : 1

      const newSlide = {
        id: newSlideId,
        image: null,
        order: prevSlides.length + 1,
      }

      // Añadir la nueva diapositiva y actualizar los números de orden
      const updatedSlides = [...prevSlides, newSlide].map((slide, index) => ({
        ...slide,
        order: index + 1,
      }))

      return updatedSlides
    })
  }

  // Quitar la diapositiva
  const removeSlide = (slideId) => {
    if (slides.length > 1) {
      const newSlides = slides.filter((slide) => slide.id !== slideId)

      const updatedSlides = newSlides.map((slide, index) => ({
        ...slide,
        order: index + 1,
      }))

      setSlides(updatedSlides)

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

      const newElementOrder = updatedPages.length + 1 // Calcular nuevo order

      if (existingPageIndex !== -1) {
        const existingPage = updatedPages[existingPageIndex]
        existingPage.gridDirection = direction
        existingPage.gridNumRows = numRows
        existingPage.elementorder = newElementOrder // Actualizar elementorder
      } else {
        updatedPages.push({
          ...initialPage,
          pageNumber,
          elementorder: newElementOrder,
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
            const response = await newPage(
              page.bookid,
              page.type,
              page.template,
              page.elementorder,
              page.gridDirection,
              page.gridNumRows
            )

            const widgetsPageNumber =
              widgetSeleted[response.data.elementorder].data

            for (const widget of widgetsPageNumber) {
              try {
                widget.pageid = response.data.pageid
                widget.widget = getWidgetId(widget)

                const res = await newWidgetItem(
                  widget.pageid,
                  widget.widget,
                  widget.widgetType,
                  widget.data
                )
                console.log('res', res)
              } catch (error) {
                console.log(error)
              }
            }
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
      // Crea una copia del estado actual
      const updatedWidgets = { ...prevWidgets }

      // Verifica si ya hay widgets para la página actual
      if (!updatedWidgets[newValue.pageNumber]) {
        updatedWidgets[newValue.pageNumber] = { data: [] }
      }

      // Filtra los widgets que no están en la misma posición que el nuevo widget
      updatedWidgets[newValue.pageNumber].data = updatedWidgets[
        newValue.pageNumber
      ].data.filter((widget) => widget.order !== newValue.order)

      // Agrega el nuevo widget al array actualizado
      updatedWidgets[newValue.pageNumber].data.push(newValue)

      return updatedWidgets
    })
  }

  const getWidgetId = (widgetItem) => {
    if (widgets) {
      for (const widget of widgets) {
        switch (widgetItem.type) {
          case 'Box':
            if (widget.name === 'Description') {
              return widget.widgetid
            }
            break

          case 'AudioRecorder':
            if (widget.name === 'Audio') {
              return widget.widgetid
            }
            break

          case 'Video':
            if (widget.name === 'Video') {
              return widget.widgetid
            }
            break

          case 'CodeBlock':
            if (widget.name === 'Code') {
              return widget.widgetid
            }
            break

          case 'UniqueSelection' || 'ReverseUniqueSelection':
            if (widget.name === 'Quiz') {
              return widget.widgetid
            }
            break

          default:
            return 'No options'
        }
      }
    }
  }

  // useEffect(() => {
  //   console.log(widgetSeleted)
  // }, [widgetSeleted])

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
