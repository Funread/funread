import './SidebarBook.css'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faSignOutAlt,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'

const SidebarBook = () => {
  const menuItems = [
    {
      text: 'Library',
      icon: faBookOpen,
    },
    {
      text: 'Groups',
      icon: faUserGroup,
    },
  ]

  return (
    <div className='custom-side-nav-container custom-side-nav-container-NX'>
      <div className='custom-nav-upper'>
        <div className='custom-nav-heading'></div>
        <div className='custom-nav-menu'>
          {menuItems.map(({ text, icon }, index) => (
            <div
              key={index}
              className='custom-menu-item border-botton custom-menu-item-NX align-items-center'
            >
              <FontAwesomeIcon icon={icon} size='xl' />
            </div>
          ))}
        </div>
      </div>
      <div className='custom-nav-footer pe-3'>
        <div className='custom-menu-item border-botton custom-menu-item-NX align-items-center'>
          <FontAwesomeIcon icon={faSignOutAlt} size='xl' />
        </div>
      </div>
    </div>
  )
}

export default SidebarBook
