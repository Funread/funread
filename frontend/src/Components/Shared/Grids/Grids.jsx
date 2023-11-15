import React, { useState, useEffect, useRef } from 'react';
import './Grids.sass';
import { useDrop } from 'react-dnd';
import UniqueSelection from '../../Widgets/Quiz/UniqueSelection/UniqueSelection';
import ReverseUniqueSelection from '../../Widgets/Quiz/ReverseQuiz/ReverseUniqueSelection';
import Video from '../../Widgets/Media/Video/Video';
import AudioRecorder from '../../Widgets/Media/VoiceRecorder/Voicerecorder';
import Box from '../../Widgets/Text/TextBox';
import { ToastContainer, toast } from 'react-toastify';

const widgetTypeToComponent = {
  UniqueSelection: UniqueSelection,
  ReverseUniqueSelection: ReverseUniqueSelection,
  Video: Video,
  AudioRecorder: AudioRecorder,
  Box: Box,
};

const Grids = ({ direction, numRows }) => {
  const [droppedWidgets, setDroppedWidgets] = useState(Array.from({ length: numRows }, () => []));
  const [isDroppable, setIsDroppable] = useState(true);
  const [isWidgetDropped, setIsWidgetDropped] = useState(false);
  const divID = useRef();

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
    setDroppedWidgets(Array.from({ length: numRows }, () => []));
      }

  }, [direction, numRows]);

  const [, drop] = useDrop(() => ({
    accept: Object.keys(widgetTypeToComponent),
    drop: (droppedWidget) => {
      if (droppedWidget.type === 'UniqueSelection' && (direction === 'horizontal', numRows === 2 ||
        direction === 'horizontal', numRows === 3 || direction === 'collage' || direction === 'quadruple')) {
        toast.error('Try another grid');
        setIsDroppable(false);
        return;
      }
      if (droppedWidget.type === 'ReverseUniqueSelection' && (direction === 'horizontal', numRows === 2 ||
        direction === 'horizontal', numRows === 3 || direction === 'collage' || direction === 'quadruple')) {
        toast.error('Try another grid');
        setIsDroppable(false);
        return;
      }  if (divID.current !== null) {
        setDroppedWidgets((prevDroppedWidgets) => {
          const updatedDroppedWidgets = [...prevDroppedWidgets];
          updatedDroppedWidgets[divID.current] = [
            ...(prevDroppedWidgets[divID.current] || []),
            droppedWidget,
          ];
          return updatedDroppedWidgets;
        });
        setIsDroppable(true);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <section className={`layout ${direction}`} ref={drop}>
      {Array.from({ length: numRows }).map((_, index) => (
        <div
          id={index}
          className={`custom-grid-component `}
          key={index}
        >
          {droppedWidgets[index] &&
            droppedWidgets[index][0] &&
            React.createElement(
              widgetTypeToComponent[droppedWidgets[index][0].type],
              {},
            )}
        </div>
      ))}
    </section>
  );
};

export default Grids;