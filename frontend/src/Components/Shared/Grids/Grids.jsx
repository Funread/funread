import React, { useState, useEffect, useRef } from 'react'
import './Grids.sass'
import { useDrop } from 'react-dnd'
import UniqueSelection from '../../Widgets/Quiz/UniqueSelection/UniqueSelection'
import ReverseUniqueSelection from '../../Widgets/Quiz/ReverseQuiz/ReverseUniqueSelection'
import Video from '../../Widgets/Media/Video/Video'
import AudioRecorder from '../../Widgets/Media/VoiceRecorder/Voicerecorder'
import Box from '../../Widgets/Text/TextBox'
import CodeBlock from '../../Widgets/CodeBlock/CodeBlock'

const widgetTypeToComponent = {
  UniqueSelection: UniqueSelection,
  ReverseUniqueSelection: ReverseUniqueSelection,
  Video: Video,
  AudioRecorder: AudioRecorder,
  Box: Box,
  CodeBlock: CodeBlock,
}


const Grids = ({ direction, numRows }) => {
  const [droppedWidgets, setDroppedWidgets] = useState(Array(numRows).fill([]))
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
        setDroppedWidgets((prevDroppedWidgets) => {
          const updatedDroppedWidgets = [...prevDroppedWidgets]
          updatedDroppedWidgets[divID.current] = [
            ...(prevDroppedWidgets[divID.current] || []),
            droppedWidget,
          ]
          return updatedDroppedWidgets
        })
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <section className={`layout ${direction}`} ref={drop}>
      {Array.from({ length: numRows }).map((_, index) => (
        <div id={index} className='custom-grid-component' key={index}>
          {Array.isArray(droppedWidgets[index]) &&
            droppedWidgets[index].map(
              (widget, widgetIndex) =>
                widgetTypeToComponent[widget.type] && (
                  <div key={widgetIndex}>
                    {React.createElement(
                      widgetTypeToComponent[widget.type],
                      {}
                    )}
                  </div>
                )
            )}
        </div>
      ))}
    </section>
  )
}

export default Grids
