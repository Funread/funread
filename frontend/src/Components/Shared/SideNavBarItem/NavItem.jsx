import './NavItem.css'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
          <div className=''>
            {subItems.map((subItem, index) => (
              <div className='icon' key={index}>
                {subItem}
                {/* <FontAwesomeIcon icon={subItem} /> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default NavItem
