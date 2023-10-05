import './SidebarBook.css'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faSignOutAlt,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const SidebarBook = () => {
  const user = useSelector((state) => state.user) // obtenemos el usuario desde el redux

  const hasRole = (role) => { // con base al role proporciona devulve true si el usuario tiene el role, o false is no lo tiene
    user.roles.forEach(userRole => {
      if(userRole.role === role){
          return true;
      }
    });
    return false
  }
  // lo de arriba es un ejemplo de como limitar las opciones del menu con base al rol del usuario


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

    <div className='custom-side-nav-container_Sidebar custom-side-nav-container-NX_Sidebar'>
      <div className='custom-nav-upper_Sidebar'>
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
