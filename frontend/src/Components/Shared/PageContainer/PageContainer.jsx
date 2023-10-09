import { useState } from 'react'
import ContentImage from '../ContentImage/ContentImage'
import Grids from '../Grids/Grids'
import './PageContainer.css'
import { useDrop } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SidebarSubItem from '../SidebarSubItem/SidebarSuItem'

const IconType = 'DRAGGABLE_SUBITEM'

const PageContainer = ({ title }) => {
  const [board, setBoard] = useState([])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: IconType, //Tipos que va a aceptar
    drop: (item) => {
      setBoard((board) => [...board, item])
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
            </div>

            <div className='card-body' ref={drop}>
              {/* <Grids /> */}
              {board.map((item, index) => (
                <div key={index} className='dropped-icon'>
                  <FontAwesomeIcon icon={item.icon} />
                  {/* <SidebarSubItem id={item.id} icon={item.icon} /> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageContainer
