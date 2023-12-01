import './PageContainer.sass'
import React, { useState, useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import Grids from '../Grids/Grids'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas'
import { ToastContainer, toast } from 'react-toastify'
import ModalReadingView from '../../ReadingView/ModalReadingView'

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
  pageInfo,
}) => {
  const [buttonVisible, setButtonVisible] = useState(true)
  const [droppedComponent, setDroppedComponent] = useState(null)

  //Se crea la constante
  const [selectedWidget, setSelectedWidget] = useState(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [fullScreenButtonVisible, setFullScreenButtonVisible] = useState(false)

  const [contentPage, setContentPage] = useState(null)
  const [droppedWidget, setDroppedWidget] = useState([])
  const [droppedWidgetData, setDroppedWidgetData] = useState([])
  const pageContainerRef = useRef(null)

  useEffect(() => {
    // Captura el contenido del PageContainer
    html2canvas(pageContainerRef.current).then((canvas) => {
      const image = new Image()
      image.src = canvas.toDataURL()
      updateImage(pageNumber, image.src)
    })
  }, [
    droppedComponent,
    pageNumber,
    updateImage,
    droppedWidget,
    droppedWidgetData,
  ])

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
    const content = pageInfo(pageNumber)
    setContentPage(content)
    setIsFullScreen(true)
    console.log(isFullScreen)
    toggleButtonVisibility(false)
    handle.enter()
    setSelectedWidget(true)
 
    setFullScreenButtonVisible(true)
  }
  const closeFull =()=>{
    setIsFullScreen(false)

  }

  const updateDroppedWidgetState = (widgets) => {
    setDroppedWidget([...droppedWidget, widgets])
  }

  const updateDroppedWidgetData = (data) => {
    setDroppedWidgetData([...droppedWidgetData, data])
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          {/* TODO: Quitar el fullscreen si se va a usar un modal*/}
          {/* <FullScreen handle={handle}> */}
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
                ref={(el) => {
                  pageContainerRef.current = el
                  drop(el)
                }}
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
                      updateWidgetDrop: updateDroppedWidgetState,
                      updateWidgetDropData: updateDroppedWidgetData,
                    }
                  )}
              </div>
            </div>
          {/* </FullScreen> */}
          {isFullScreen && (<ModalReadingView contentPage={contentPage} onClose={closeFull}/> )}
          {/* <ToastContainer position='top-right' /> */}
        </div>
      </div>
    </div>
  )
}

export default PageContainer
