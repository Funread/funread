import './SidebarBook.sass'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faSignOutAlt,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from "react-router-dom"

const SidebarBook = () => {
  const user = useSelector((state) => state.user) 
  const navigate = useNavigate();

  const hasRole = (role) => { 
    user.roles.forEach(userRole => {
      if(userRole.role === role){
          return true;
      }
    });
    return false
  }



  const menuItems = [
    {
      text: 'Library',
      icon: faBookOpen,
      url:'/demo/library'
    },
    {
      text: 'Groups',
      icon: faUserGroup,
      url:'/demo/group'
    },
  ]

  return (
    <div className='custom-side-nav-container_Sidebar custom-side-nav-container-NX_Sidebar'>
      <div className='custom-nav-upper_Sidebar pt-5'>
        <div className='custom-nav-heading_Sidebar'></div>
        <div className='custom-nav-menu_Sidebar'>
          {menuItems.map(({ text, icon, url }, index) => (
            <div
              key={index}
              className='custom-menu-item_Sidebar border-botton custom-menu-item-NX_Sidebar align-items-center'
            >
              <FontAwesomeIcon icon={icon} size='xl' onClick={() =>  navigate(url)}/>
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
