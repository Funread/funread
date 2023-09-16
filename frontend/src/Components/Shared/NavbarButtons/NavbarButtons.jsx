import ButtonNav from '../NavButton/ButtonNav'
import './NavbarButtons.css'

const NavbarButtons = () => {
  return (
    <nav className='navbar'>
      <div>
        <ButtonNav title='My Library' />
        <ButtonNav title='Shared Library' />
        <ButtonNav title='My Groups' />
      </div>
    </nav>
  )
}

export default NavbarButtons
