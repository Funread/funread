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
import ReverseUniqueSelection from '../../Widgets/Quiz/ReverseQuiz/ReverseUniqueSelection'
import AudioRecorder from '../../Widgets/Media/VoiceRecorder/Voicerecorder'
import Video from '../../Widgets/Media/Video/Video'
import Box from '../../Widgets/Text/TextBox'
import WidgetTypeEnum from '../../Utils/Enums/WidgetTypeEnum'
import CodeBlock from '../../Widgets/CodeBlock/CodeBlock'
import GameModes from '../../Widgets/Game/WordSearchGame/GameModes'
import WidgetImage from '../../Widgets/Media/Images/WidgetImage'

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
        {
          id: 1,
          image: '/imagenes/grids/fullgrid.png',
          widget: <Grids direction={'horizontal'} numRows={1} />,
        },
        {
          id: 2,
          image: '/imagenes/grids/verticaldoublegrid.png',
          widget: <Grids direction={'vertical'} numRows={2} />,
        },
        {
          id: 3,
          image: '/imagenes/grids/horizontaltriplegrid.png',
          widget: <Grids direction={'horizontal'} numRows={3} />,
        },
        {
          id: 4,
          image: '/imagenes/grids/quadruplegrid.png',
          widget: <Grids direction={'quadruple'} numRows={4} />,
        },
        {
          id: 5,
          image: '/imagenes/grids/horizontaldoublegrid.png',
          widget: <Grids direction={'horizontal'} numRows={2} />,
        },
        
        {
          id: 6,
          image: '/imagenes/grids/collagegrid.png',
          widget: <Grids direction={'collage'} numRows={7} />,
        },
        {
          id: 7,
          image: '/imagenes/grids/horizontaldoubleFirstBig.png',
          widget: <Grids id={2} direction={'horizontalBigFirst'} numRows={2} />,
        },
      ],
    },
    {
      text: 'Text',
      icon: faA,
      subItems: [
        {
          id: 1,
          image: '/imagenes/widgets/text.png',
          widget: <Box />,
          widgetType: WidgetTypeEnum.Text,
        },
      ],
    },
    {
      text: 'Media',
      icon: faPhotoVideo,
      subItems: [
        {
          id: 1,
          image: '/imagenes/widgets/audio.png',
          widget: <AudioRecorder />,
          widgetType: WidgetTypeEnum.Media,
        },
        {
          id: 2,
          image: '/imagenes/widgets/video.png',
          widget: <Video />,
          widgetType: WidgetTypeEnum.Media,
        },
        {
          id: 3,
          image: '/imagenes/widgets/image.png',
          widget: <WidgetImage />,
          widgetType: WidgetTypeEnum.Media,
        },
      ],
    },
    {
      text: 'Shapes',
      icon: faShapes,
      subItems: [],
    },
    {
      text: 'Quiz',
      icon: faPuzzlePiece,
      subItems: [
        {
          id: 1,
          image: '/imagenes/widgets/quiz.png',
          widget: <UniqueSelection />,
          widgetType: WidgetTypeEnum.Quiz,
        },
        {
          id: 2,
          image: '/imagenes/widgets/reverseQuiz.png',
          widget: <ReverseUniqueSelection />,
          widgetType: WidgetTypeEnum.Quiz,
        },
      ],
    },
    {
      text: 'Games',
      icon: faGamepad,
      subItems: [
        {
          id: 1,
          image: '/imagenes/widgets/wordsearchgame.png',
          widget: <GameModes/>,
          widgetType: WidgetTypeEnum.Games,
        },
      ],
    },
    {
      text: 'Code Block',
      icon: faA,
      subItems: [
        {
          id: 1,
          image: '/imagenes/widgets/widgetItem.png',
          widget: <CodeBlock />,
          widgetType: WidgetTypeEnum.Code,
        },
      ],
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
