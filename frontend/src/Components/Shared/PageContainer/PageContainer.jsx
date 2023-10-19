import React, { useState } from 'react'
import UniqueSelection from '../../Widgets/Quiz/UniqueSelection'
import './PageContainer.sass'
import { useDrop } from 'react-dnd'
import TripleGridHorizontal from '../Grids/TripleGridHorizontal/TripleGridHorizontalPlaceholder'
import CollageGrid from '../Grids/CollageGrid/CollageGridPlaceholder'
import DoubleGridHorizontal from '../Grids/DoubleGridHorizontal/DoubleGridPlaceholder'
import DoubleGridVertical from '../Grids/DoubleGridVertical/DoubleGridVerticalPlaceholder'
import FullGrid from '../Grids/FullGrid/FullGridPlaceholder'
import QuadrupleGrid from '../Grids/QuadrupleGrid/QuadrupleGridPlaceholder'

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

const PageContainer = ({ title }) => {
  const [droppedComponent, setDroppedComponent] = useState(null)
  const [saveData, setSaveData] = useState(null)

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
    setDroppedComponent(null)
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <div className='card shadow mb-4 content_page'>
            <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
              <h6 className='m-0 font-weight-bold text-primary'>{title}</h6>
  

              <div className='card-body' width={'5000'}>
                <button onClick={remove}>
                  <img src='/escoba.png' alt='Clear' />
                </button>
                <button onClick={save}>
                  <img src='/expediente.png' alt='Save' />
                </button>
              </div>
            </div>

            <div
              className='card-body custom-card-body-page-container'
              ref={drop}
            >
              {widgetTypeToComponent[droppedComponent] &&
                React.createElement(widgetTypeToComponent[droppedComponent], {
                  saveData,
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageContainer
