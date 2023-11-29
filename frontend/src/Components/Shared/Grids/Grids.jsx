import React, { useState, useEffect, useRef } from 'react'
import './Grids.sass'
import { useDrop } from 'react-dnd'
import UniqueSelection from '../../Widgets/Quiz/UniqueSelection/UniqueSelection'
import ReverseUniqueSelection from '../../Widgets/Quiz/ReverseQuiz/ReverseUniqueSelection'
import Video from '../../Widgets/Media/Video/Video'
import AudioRecorder from '../../Widgets/Media/VoiceRecorder/Voicerecorder'
import Box from '../../Widgets/Text/TextBox'
import CodeBlock from '../../Widgets/CodeBlock/CodeBlock'
import { ToastContainer, toast } from 'react-toastify'
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

const Grids = ({ direction, numRows, pageOrder, widgetChange }) => {
  
  const [droppedWidgets, setDroppedWidgets] = useState(
    Array(numRows).fill(null)
  )
  const [isDroppable, setIsDroppable] = useState(true)
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

      // Clear dropped widgets when direction or numRows changes
      setDroppedWidgets(Array.from({ length: numRows }, () => []))
    }
  }, [direction, numRows])


  const [, drop] = useDrop(() => ({
    accept: Object.keys(widgetTypeToComponent),
    drop: (droppedWidget) => {
      if(canDrop(droppedWidget.type,droppedWidget.widgetType,direction,numRows)){
        if (divID.current !== null) {
          // Generar un ID único para el widget
          const widgetWithId = { ...droppedWidget, widgetId: generateUniqueId() }
  
          setDroppedWidgets((prevDroppedWidgets) => {
            const updatedDroppedWidgets = [...prevDroppedWidgets]
            updatedDroppedWidgets[divID.current] = widgetWithId
  
            return updatedDroppedWidgets
          })
          setIsDroppable(true)
        }
      }else{
        toast.error('That component cannot be placed there, try another grid to use it.')
        setIsDroppable(false)
        return
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }),[direction, numRows])

  const canDrop = (type, widgetType,direction, numRows) => {
    switch(widgetType){
      case 1:  //los textos se pueden poner en cualquier grid
        return true
      case 2:  //los archivos media se puden poner en cualquier grid
        if(type === 'WidgetImage' && direction === 'horizontal' && numRows === 3){
          return false;
        }
        return true
      case 3:  //las formas aun no se sabe como iran
        return true
      case 4:  //los quices solo se pueden poner en el grid full
        if(direction === 'horizontal' && numRows === 1){
          return true;
        }
        return false;
      case 5: //los juegos solo se pueden poner en el grid full
        if(direction === 'horizontal' && numRows === 1){
          return true;
        }
        return false;
      case 6:  // el codigo solo se puede poner en el grid full
        if(direction === 'horizontal' && numRows === 1){
          return true;
        }
        return false
      default:
        return true
    }
  }

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(7)
  }

  return (
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
  )
}

export default Grids
