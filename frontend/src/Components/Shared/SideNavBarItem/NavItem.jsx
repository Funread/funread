import './NavItem.sass'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SidebarImages from '../SidebarImages/SidebarImages'

const NavItem = ({ text, icon, subItems, isExpanded, isSelected, onClick }) => {
  const [selectedItem, setSelectedItem] = useState(false)

  const handleItemClick = () => {
    setSelectedItem(!selectedItem)
    if (onClick) {
      onClick()
    }
  }

  return (
    <>
      <div
        key={text}
        className={`custom-menu-item ${
          isExpanded ? '' : 'custom-menu-item-NX'
        } ${isSelected ? 'open' : ''}`}
        onClick={handleItemClick}
      >
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <FontAwesomeIcon icon={icon} />
            {isExpanded && <p className='ml-2'>{text}</p>}
          </div>
        </div>
      </div>
      {isSelected && (
        <div className='custom-card'>
          <div
            className={`${
              isExpanded ? 'icon-grid' : 'icon-grid-no-expanded-sidebar'
            }`}
          >
            {subItems.map((subItem, index) => (
              <div key={index} className='grid-item'>
                <SidebarImages key={index} item={subItem} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default NavItem
