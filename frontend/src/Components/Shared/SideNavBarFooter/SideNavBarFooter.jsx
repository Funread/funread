// SideNavBarFooter.js
import React from 'react'
import './SideNavBarFooter.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const SideNavBarFooter = ({ user, isExpanded }) => {
  return (
    <div className='custom-nav-footer'>
      {isExpanded && (
        <div className='custom-nav-details'>
          <FontAwesomeIcon icon={faUser} />
          <div className='custom-nav-footer-info'>
            <p className='custom-nav-footer-user-position'>Logged in as:</p>
            <p className='custom-nav-footer-user-name'>{user}</p>
          </div>
        </div>
      )}
      <FontAwesomeIcon className='logout-icon' icon={faSignOutAlt} />
    </div>
  )
}

export default SideNavBarFooter
