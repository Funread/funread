import './PageContainer.sass'
import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import Grids from '../Grids/Grids'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas'
import { ToastContainer } from 'react-toastify'

//Objeto para nombrar todos los componentes que serán soltados en el contenedor
const widgetTypeToComponent = {
  Grids: Grids,
}

const PageContainer = ({
  pageNumber,
  order,
  onRemoveSlides,
  updateImage,
  addOrUpdatePage,
  widgetChange,
}) => {
  const [buttonVisible, setButtonVisible] = useState(true)
  const [droppedComponent, setDroppedComponent] = useState(null)

  useEffect(() => {
    captureImage()
  }, [droppedComponent, pageNumber])

  const captureImage = () => {
    // Captura el contenido del PageContainer
    html2canvas(document.getElementById(`pageContainer-${pageNumber}`)).then(
      (canvas) => {
        // Convierte el canvas en una imagen
        const image = new Image()
        image.src = canvas.toDataURL()

        // Llama a la función del BookCreator para pasar la imagen
        updateImage(pageNumber, image.src)
      }
    )
  }

  const [, drop] = useDrop(() => ({
    accept: Object.keys(widgetTypeToComponent),
    drop: (item) => {
      const droppedComponentInfo = {
        type: item.type,
        direction: item.direction,
        rows: item.numRows,
      }
      addOrUpdatePage(
        pageNumber,
        droppedComponentInfo.direction,
        droppedComponentInfo.rows
      )
      setDroppedComponent(droppedComponentInfo)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const remove = () => {
    onRemoveSlides(pageNumber)
    // setDroppedComponent(null)
  }

  const handle = useFullScreenHandle()

  const toggleButtonVisibility = (isVisible) => {
    setButtonVisible(isVisible)
  }

  const handleEnterFullScreen = () => {
    toggleButtonVisibility(false)
    handle.enter()
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <FullScreen handle={handle}>
            <div className='card shadow mb-4 content_page shadow rounded'>
              <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                <h6 className='m-0 font-weight-bold text-info'>
                  {`Activity ${order}`}
                </h6>
                <div className='d-flex'>
                  {!handle.active && (
                    <div className='fullscreen-buttons'>
                      <button
                        id='btnDivs'
                        onClick={handleEnterFullScreen}
                        style={{ backgroundColor: 'rgb(182, 214, 242)' }}
                      >
                        <FontAwesomeIcon icon={faExpandArrowsAlt} />
                        <i className='fa fa-expand'></i>
                      </button>
                    </div>
                  )}

                  <button
                    onClick={remove}
                    id='btnDivs'
                    style={{ backgroundColor: 'rgb(255, 185, 204)' }}
                  >
                    <FontAwesomeIcon size='lg' icon={faTrash} />
                  </button>
                </div>
              </div>

              <div
                id={`pageContainer-${pageNumber}`}
                className='card-body custom-card-body-page-container p-0'
                ref={drop}
              >
                {droppedComponent &&
                  widgetTypeToComponent[droppedComponent.type] &&
                  React.createElement(
                    widgetTypeToComponent[droppedComponent.type],
                    {
                      direction: droppedComponent.direction,
                      numRows: droppedComponent.rows,
                      pageOrder: order,
                      widgetChange: widgetChange,
                    }
                  )}
              </div>
            </div>
          </FullScreen>
          <ToastContainer position='top-right' />
        </div>
      </div>
    </div>
  )
}

export default PageContainer
