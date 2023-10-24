import './PageContainer.sass'
import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import UniqueSelection from '../../Widgets/Quiz/UniqueSalection/UniqueSelection'
import TripleGridHorizontal from '../Grids/TripleGridHorizontal/TripleGridHorizontalPlaceholder'
import CollageGrid from '../Grids/CollageGrid/CollageGridPlaceholder'
import DoubleGridHorizontal from '../Grids/DoubleGridHorizontal/DoubleGridPlaceholder'
import DoubleGridVertical from '../Grids/DoubleGridVertical/DoubleGridVerticalPlaceholder'
import FullGrid from '../Grids/FullGrid/FullGridPlaceholder'
import QuadrupleGrid from '../Grids/QuadrupleGrid/QuadrupleGridPlaceholder'
import html2canvas from 'html2canvas'

const widgetType = 'widgetType'

//Objeto para nombrar todos los componentes que serán soltados en el contenedor
const widgetTypeToComponent = {
  UniqueSelection: UniqueSelection,
  TripleGridHorizontal: TripleGridHorizontal,
  CollageGrid: CollageGrid,
  DoubleGridHorizontal: DoubleGridHorizontal,
  DoubleGridVertical: DoubleGridVertical,
  FullGrid: FullGrid,
  QuadrupleGrid: QuadrupleGrid,
}

const PageContainer = ({ pageNumber, onRemoveSlides, onImageCaptured }) => {
  const [buttonVisible, setButtonVisible] = useState(true)
  const [droppedComponent, setDroppedComponent] = useState(null)
  const [saveData, setSaveData] = useState(null)

  useEffect(() => {
    captureImage()
  }, [droppedComponent, pageNumber])

  const captureImage = () => {
    // Captura el contenido del PageContainer
    html2canvas(document.getElementById('pageContainer')).then((canvas) => {
      // Convierte el canvas en una imagen
      const image = new Image()
      image.src = canvas.toDataURL()

      // Llama a la función proporcionada por BookCreator para pasar la imagen
      onImageCaptured(pageNumber, image.src)
    })
  }

  const save = (data) => {
    console.log(data)
    setSaveData(true)
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: widgetType,
    drop: (item) => {
      console.log(item)
      setDroppedComponent(item.type)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const remove = () => {
    onRemoveSlides()
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
            <div className='card shadow mb-4 content_page'>
              <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                <h6 className='m-0 font-weight-bold text-primary'>
                  {'Activity ' + pageNumber}
                </h6>
                <div className='d-flex'>
                  <button onClick={remove}>
                    <img src='/escoba.png' alt='Clear' />
                  </button>
                  <button onClick={save}>
                    <img src='/expediente.png' alt='Save' />
                  </button>

                  {!handle.active && (
                    <div className='fullscreen-buttons'>
                      <button id='buttonExpand' onClick={handleEnterFullScreen}>
                        <FontAwesomeIcon icon={faExpandArrowsAlt} />
                        <i className='fa fa-expand'></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div
                id='pageContainer'
                className='card-body custom-card-body-page-container'
                ref={drop}
              >
                {widgetTypeToComponent[droppedComponent] &&
                  React.createElement(widgetTypeToComponent[droppedComponent], {
                    saveData,
                  })}
              </div>
            </div>
          </FullScreen>
        </div>
      </div>
    </div>
  )
}

export default PageContainer
