import './SidebarLeftTopTop.sass'
import 'bootstrap/js/dist/dropdown'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faA,
  faShapes,
  faGamepad,
  faPhotoVideo,
  faPuzzlePiece,
  faTh,
} from '@fortawesome/free-solid-svg-icons'
import NavItem from '../SideNavBarItem/NavItem'
import SideNavBarFooter from '../SideNavBarFooter/SideNavBarFooter'
import UniqueSelection from '../../Widgets/Quiz/UniqueSelection/UniqueSelection'
import Grids from '../Grids/Grids'

const SidebarLeftTopTop = () => {
  const [isExpanded, setExpendState] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleItemClick = (index) => {
    if (selectedItem === index) {
      setSelectedItem(null) // Se cierra si es la misma card clickeada
    } else {
      setSelectedItem(index) // Abre la tarjeta clickeada.
    }
  }

  useEffect(() => {
    const handleResize = () => {
      // Activa el modo hamburguesa si el ancho de la pantalla es menor a 768px
      if (window.innerWidth <= 1000) {
        setExpendState(false)
      } else {
        setExpendState(true)
      }
    }

    // Escucha cambios en el tamaño de la ventana
    window.addEventListener('resize', handleResize)

    // Limpia el oyente al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const user = 'FUNREAD'
  const menuItems = [
    {
      text: 'Grids',
      icon: faTh,
      subItems: [
        <Grids direction={'horizontal'} numRows={1} />,
        <Grids direction={'vertical'} numRows={2} />,
        <Grids direction={'horizontal'} numRows={3} />,
        <Grids direction={'quadruple'} numRows={4} />,
        <Grids direction={'horizontal'} numRows={2} />,
        <Grids direction={'collage'} numRows={7} />,
      ],
    },
    {
      text: 'Text',
      icon: faA,
      subItems: [],
    },
    {
      text: 'Media',
      icon: faPhotoVideo,
      subItems: [],
    },
    {
      text: 'Shapes',
      icon: faShapes,
      subItems: [],
    },
    {
      text: 'Quiz',
      icon: faPuzzlePiece,
      subItems: [<UniqueSelection />],
    },
    {
      text: 'Games',
      icon: faGamepad,
      subItems: [],
    },
  ]

  return (
    <div
      className={
        isExpanded
          ? 'custom-side-nav-container'
          : 'custom-side-nav-container custom-side-nav-container-NX'
      }
    >
      <div className='custom-nav-upper'>
        <div className='custom-nav-heading d-flex justify-content-between align-items-center'>
          {isExpanded && (
            <div className='custom-nav-brand'>
              <h2>FUNREAD</h2>
            </div>
          )}
          <button
            className='hamburger'
            onClick={() => setExpendState(!isExpanded)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className='custom-nav-menu'>
          {menuItems.map(({ text, icon, subItems }, index) => (
            <NavItem
              key={index}
              text={text}
              icon={icon}
              subItems={subItems}
              isExpanded={isExpanded}
              isSelected={selectedItem === index}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
      <SideNavBarFooter user={user} isExpanded={isExpanded} />
    </div>
  )
}

export default SidebarLeftTopTop
