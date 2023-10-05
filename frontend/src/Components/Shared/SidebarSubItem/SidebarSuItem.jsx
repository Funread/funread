import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDrag } from 'react-dnd'

const IconType = 'DRAGGABLE_SUBITEM'

const SidebarSubItem = ({ id, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: IconType, // identificador
    item: { id, icon }, //Pasamos el icon al drop
    //La funcion collect es opcional
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), //Ayuda a saber si se está arrastrando o no
    }),
  }))

  return (
    <div
      ref={drag}
      className='icon'
      style={{ border: isDragging ? '5px solid pink' : '0px' }}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  )
}
export default SidebarSubItem
