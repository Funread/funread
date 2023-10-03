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

    <div className='custom-side-nav-container_Sidebar'>
      <div className='custom-nav-upper_Sidebar pt-5'>
        <div className='custom-nav-heading_Sidebar'></div>
        <div className='custom-nav-menu_Sidebar'>
          {menuItems.map(({ text, icon }, index) => (
            <div
              key={index}
              className='custom-menu-item_Sidebar border-botton custom-menu-item-NX_Sidebar align-items-center'

            >
              <FontAwesomeIcon icon={icon} size='xl' />
            </div>
          ))}
        </div>
      </div>
      <div className='custom-nav-footer pe-3'>

        <div className='custom-menu-item border-botton_Sidebar custom-menu-item-NX_Sidebar align-items-center'>

          <FontAwesomeIcon icon={faSignOutAlt} size='xl' />
        </div>
      </div>
    </div>
  )
}

export default SidebarBook
