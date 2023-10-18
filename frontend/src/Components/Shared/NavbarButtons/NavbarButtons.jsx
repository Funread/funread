import ButtonNav from '../NavButton/ButtonNav'
import './NavbarButtons.sass'

const NavbarButtons = () => {
  return (
    <nav className='navbar'>
      <div className='buttons-navbar'>
        <ButtonNav title='My Library' />
        <ButtonNav title='Shared Library' />
        <ButtonNav title='My Groups' />
      </div>
    </nav>
  )
}

export default NavbarButtons
