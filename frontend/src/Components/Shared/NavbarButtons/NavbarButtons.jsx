import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ButtonNav from '../NavButton/ButtonNav'
import './NavbarButtons.sass'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const NavbarButtons = ({ saveSlides, titleBook }) => {
  const handleSaveSlides = (e) => {
    e.preventDefault()
    saveSlides(e)
  }

  return (
    <nav className='custom-navbar-buttons'>
      <div className='buttons-navbar'>
        <ButtonNav title='My Library' />
        <ButtonNav title='Shared Library' />
        <ButtonNav title='My Groups' />
      </div>
      <div className='d-flex'>
        <h3 className='mt-1 mx-5 text-muted'>Title: {titleBook}</h3>
        <button className='custom-navbar-save-buttom' onClick={handleSaveSlides}>
          <FontAwesomeIcon size='2x' icon={faSave} />
        </button>
      </div>
    </nav>
  )
}

export default NavbarButtons
