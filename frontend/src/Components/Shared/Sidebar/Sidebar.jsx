import './Sidebar.css'
import 'bootstrap/js/dist/dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faA,
  faShapes,
  faImage,
  faVideo,
  faVolumeUp,
  faPieChart,
  faTextHeight,
  faTextWidth,
  faSquare,
  faCircle,
  faRectangleAd,
} from '@fortawesome/free-solid-svg-icons'
import NavItem from '../SideNavBarItem/NavItem'
import SideNavBarFooter from '../SideNavBarFooter/SideNavBarFooter'
import { useEffect, useState } from 'react'

const Sidebar = () => {
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
      if (window.innerWidth <= 768) {
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
      text: 'My courses',
      icon: faA,
      subItems: [faTextHeight, faTextWidth],
    },
    {
      text: 'HomeWork',
      icon: faShapes,
      subItems: [faSquare, faCircle, faRectangleAd],
    },
    {
      text: 'Images',
      icon: faImage,
      subItems: [
        faImage,
        faImage,
        faImage,
        faImage,
        faImage,
        faImage,
        faImage,
        faImage,
        faImage,
      ],
    },
    {
      text: 'Video',
      icon: faVideo,
      subItems: [faVideo, faVideo, faVideo, faVideo, faVideo],
    },
    {
      text: 'Audio',
      icon: faVolumeUp,
      subItems: [faVolumeUp, faVolumeUp, faVolumeUp],
    },
    {
      text: 'Graphics',
      icon: faPieChart,
      subItems: [faPieChart, faPieChart, faPieChart],
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

export default Sidebar
