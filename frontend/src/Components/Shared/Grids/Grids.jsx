import React, { useState, useEffect, useRef } from 'react'
import './Grids.sass'
import { useDrop } from 'react-dnd'
import UniqueSelection from '../../Widgets/Quiz/UniqueSelection/UniqueSelection'
import ReverseUniqueSelection from '../../Widgets/Quiz/ReverseQuiz/ReverseUniqueSelection'
import Video from '../../Widgets/Media/Video/Video'
import AudioRecorder from '../../Widgets/Media/VoiceRecorder/Voicerecorder'
import Box from '../../Widgets/Text/TextBox'
import CodeBlock from '../../Widgets/CodeBlock/CodeBlock'
import WidgetImage from '../../Widgets/Media/Images/WidgetImage'
import GameModes from '../../Widgets/Game/WordSearchGame/GameModes'

const widgetTypeToComponent = {
  UniqueSelection: UniqueSelection,
  ReverseUniqueSelection: ReverseUniqueSelection,
  Video: Video,
  AudioRecorder: AudioRecorder,
  Box: Box,
  CodeBlock: CodeBlock,
  WidgetImage: WidgetImage,
  GameModes: GameModes,
}

const Grids = ({
  direction,
  numRows,
  pageOrder,
  widgetChange,
  modeStudent,
  listedWidgets,
}) => {
  const [droppedWidgets, setDroppedWidgets] = useState(
    Array(numRows).fill(null)
  )
  const divID = useRef()

  useEffect(() => {
    const parentsDiv = document.querySelectorAll('.custom-grid-component')
    const dropEventListeners = []

    parentsDiv.forEach((parentDiv) => {
      const dropEventListener = (event) => {
        event.preventDefault()
        divID.current = event.srcElement.id
      }
      parentDiv.addEventListener('drop', dropEventListener)
      dropEventListeners.push({ parentDiv, dropEventListener })
    })

    // Elimina los event listeners cuando se desmonte el componente
    return () => {
      dropEventListeners.forEach(({ parentDiv, dropEventListener }) => {
        parentDiv.removeEventListener('drop', dropEventListener)
      })
    }
  }, [])

  const [, drop] = useDrop(() => ({
    accept: Object.keys(widgetTypeToComponent),
    drop: (droppedWidget) => {
      if (divID.current !== null) {
        // Generar un ID único para el widget
        const widgetWithId = { ...droppedWidget, widgetId: generateUniqueId() }

        setDroppedWidgets((prevDroppedWidgets) => {
          const updatedDroppedWidgets = [...prevDroppedWidgets]
          updatedDroppedWidgets[divID.current] = widgetWithId

          return updatedDroppedWidgets
        })
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(7)
  }

  return (
    <>
      {modeStudent ? (
        <section className={`layout ${direction}`} ref={drop}>
          {Array.from({ length: numRows }).map((_, index) => (
            <div id={index} className='custom-grid-component' key={index}>
              {widgetTypeToComponent[droppedWidgets[index]?.type] &&
                React.createElement(
                  widgetTypeToComponent[droppedWidgets[index].type],
                  {
                    onWidgetChange: (data) =>
                      widgetChange({
                        ...data,
                        widgetId: droppedWidgets[index].widgetId,
                        widgetType: droppedWidgets[index].widgetType,
                        pageNumber: pageOrder,
                        order: index,
                      }),
                  }
                )}
            </div>
          ))}
        </section>
      ) : (
        <section className={`layout ${direction}`}>
          {Array.from({ length: numRows }).map((_, index) => (
            <div id={index} className='custom-grid-component' key={index}>
              {listedWidgets.map()}
              {/* {widgetTypeToComponent[droppedWidgets[index]?.type] &&
                React.createElement(
                  widgetTypeToComponent[droppedWidgets[index].type],
                  {
                    onWidgetChange: (data) =>
                      widgetChange({
                        ...data,
                        widgetId: droppedWidgets[index].widgetId,
                        widgetType: droppedWidgets[index].widgetType,
                        pageNumber: pageOrder,
                        order: index,
                      }),
                  }
                )} */}
            </div>
          ))}
        </section>
      )}
    </>
  )
}

export default Grids
