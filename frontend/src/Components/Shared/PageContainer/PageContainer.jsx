import { useState } from 'react'
import UniqueSelection from '../../Widgets/Quiz/UniqueSelection'
// import ContentImage from '../ContentImage/ContentImage'
// import Grids from '../Grids/Grids'
import './PageContainer.css'
import { useDrop } from 'react-dnd'

const IconType = 'DRAGGABLE_SUBITEM'

const PageContainer = ({ title }) => {
  const [droppedItem, setDroppedItem] = useState(null)
  const [saveData, setSaveData] = useState(null)

  const save = (data) => {
    console.log(data)
    setSaveData(true)
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: IconType, //Tipos que va a aceptar
    drop: (item) => {
      setDroppedItem(item)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <div className='card shadow mb-4 content_page'>
            <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
              <h6 className='m-0 font-weight-bold text-primary'>{title}</h6>
              <button onClick={save}>save</button>
            </div>
            <div
              className='card-body custom-card-body-page-container'
              ref={drop}
            >
              {droppedItem && <UniqueSelection saveData={saveData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageContainer
{
  /* <div className='card-body'></div>

           <div> <Grids /> </div>
            <UniqueSelection saveData={save} /> */
}
