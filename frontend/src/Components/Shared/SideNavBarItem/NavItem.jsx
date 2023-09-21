import './NavItem.css'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavItem = ({ text, icon, subItems, isExpanded, isSelected, onClick,TemplateSeleccion }) => {
  const [selectedItem, setSelectedItem] = useState(false)
  const [clickedImageName, setClickedImageName] = useState('')

  const handleItemClick = () => {
    setSelectedItem(!selectedItem)
    if (onClick) {
      onClick()
    }
  }

  const handleImageClick = (imageName,id) => {
    setClickedImageName(imageName)    
    TemplateSeleccion(id)
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
          <div className='icon-grid'>
            {subItems.map((subItem, index) => (
              <div className='icon' key={index}>
                <FontAwesomeIcon icon={subItem} />
                {subItem.imageSrc && (
                  <img
                    src={subItem.imageSrc}
                    alt={text}
                    className='submenu-image'
                    onClick={() => handleImageClick(subItem.imageSrc, subItem.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default NavItem
