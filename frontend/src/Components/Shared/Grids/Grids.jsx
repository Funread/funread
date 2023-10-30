import React, { useState } from 'react'
import './Grids.sass'
import { useDrop } from 'react-dnd'
import UniqueSelection from '../../Widgets/Quiz/UniqueSelection/UniqueSelection'
import ReverseUniqueSelection from '../../Widgets/Quiz/ReverseQuiz/ReverseUniqueSelection'
import Video from '../../Widgets/Media/Video/Video'
import AudioRecorder from '../../Widgets/Media/VoiceRecorder/Voicerecorder'

const widgetTypeToComponent = {
  UniqueSelection: UniqueSelection,
  ReverseUniqueSelection: ReverseUniqueSelection,
  Video: Video,
  AudioRecorder: AudioRecorder,
}

const Grids = ({ direction, numRows }) => {
  const [droppedWidgets, setDroppedWidgets] = useState([])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: Object.keys(widgetTypeToComponent),
    drop: (droppedWidget) => {
      // Agrega el widget soltado a la lista de widgets en el estado
      setDroppedWidgets((prevWidgets) => [...prevWidgets, droppedWidget])
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <section className={`layout ${direction}`} ref={drop}>
      {Array.from({ length: numRows }).map((_, index) => (
        <div className='custom-grid-component' key={index}>
          {index < droppedWidgets.length ? (
            // Renderiza el componente correspondiente al tipo del widget soltado
            React.createElement(
              widgetTypeToComponent[droppedWidgets[index].type],
              {
                key: `widget-${index}`,
                ...droppedWidgets[index],
              }
            )
          ) : (
            // Renderiza un espacio vacío si no hay widget en esa posición
            <div
              className='empty-widget-slot'
              key={`empty-slot-${index}`}
            ></div>
          )}
        </div>
      ))}
    </section>
  )
}

export default Grids
