import './GroupClasses.sass'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GroupClasses = () => {
  return (
    <div className='add-group-class'>
      <h5 className='custom-h5-group-class'>Add class</h5>
      <button className='group-class-custom-add-buttom'>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}

export default GroupClasses
